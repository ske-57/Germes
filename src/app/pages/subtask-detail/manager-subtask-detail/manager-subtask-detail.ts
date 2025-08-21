import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  WorkTypeTask,
  Subtask,
} from '../../../services/manager-service/manager-service';

type MachineWork = {
  hours?: number;    // часы работы техники
  units?: number;    // ед. операций/рейсов
};

type SubtaskDetails = {
  assignees: string[];        // кто выполняет
  deadline?: string;          // срок
  plannedQty?: number;        // плановое количество
  actualQty?: number;         // фактическое количество
  machine?: MachineWork;      // работа техники
  reportLinks?: { title: string; href: string }[]; // ссылки на отчеты (заглушка)
};

@Component({
  selector: 'app-manager-subtask-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-subtask-detail.html',
  styleUrl: './manager-subtask-detail.css'
})
export class ManagerSubtaskDetail implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService
  ) { }

  searchControl = new FormControl('');

  currentProject: Project = { id: 0, name: 'Загрузка…', totalTasks: 0, activeTasks: 0 };
  currentStage: Stage = { id: '', title: 'Загрузка…', status: 'Planned' };
  currentTask: WorkTypeTask | null = null;
  currentSubtask: Subtask | null = null;

  details: SubtaskDetails = {
    assignees: [],
    deadline: undefined,
    plannedQty: undefined,
    actualQty: undefined,
    machine: { hours: undefined, units: undefined },
    reportLinks: []
  };

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();

    // 1) забираем всё из state, если пришли кликом
    if (nav?.extras.state) {
      this.currentProject = (nav.extras.state['project'] as Project) ?? this.currentProject;
      this.currentStage = (nav.extras.state['stage'] as Stage) ?? this.currentStage;
      this.currentTask = (nav.extras.state['task'] as WorkTypeTask) ?? this.currentTask;
      this.currentSubtask = (nav.extras.state['subtask'] as Subtask) ?? this.currentSubtask;
    }

    // 2) восстанавливаем по параметрам URL при прямом заходе
    this.route.paramMap.subscribe(p => {
      const projectId = p.get('projectId');
      const stageId = p.get('stageId');
      const taskId = p.get('taskId');
      const subtaskId = p.get('subtaskId');

      if (projectId && !nav?.extras.state) {
        this.currentProject = { id: +projectId, name: `Проект ${projectId}`, totalTasks: 0, activeTasks: 0 };
      }
      if (stageId && !nav?.extras.state) {
        this.currentStage = { id: stageId, title: `Этап ${stageId}`, status: 'InProgress' };
      }

      // если нет task/subtask в state — подтягиваем из JSON-заглушки
      if (stageId && taskId && (!this.currentTask || !this.currentSubtask)) {
        this.manager.getWorkTypesByStageJSON(stageId).subscribe(tasks => {
          this.currentTask = tasks.find(t => t.task_id === taskId) ?? null;
          if (this.currentTask && subtaskId) {
            this.currentSubtask = (this.currentTask.subtasks ?? []).find(s => s.subtask_id === subtaskId) ?? null;
          }
          this.fillDetailsFallback();
        });
      } else {
        // если всё уже есть — просто заполним детали
        this.fillDetailsFallback();
      }
    });
  }

  /** Заглушка деталей подзадачи:
   * В реальности эти поля прилетят отдельным API. Пока даём мок по subtask_id.
   */
  private fillDetailsFallback(): void {
    const id = this.currentSubtask?.subtask_id ?? 'unknown';
    const dict: Record<string, SubtaskDetails> = {
      'st1': {
        assignees: ['Иванов И.', 'Петров П.'],
        deadline: '2025-08-20',
        plannedQty: 100,
        actualQty: 100,
        machine: { hours: 12, units: 3 },
        reportLinks: [
          { title: 'Акт №101', href: '#' },
          { title: 'Фотоотчет', href: '#' },
        ]
      },
      'st2': {
        assignees: ['Сидоров С.'],
        deadline: '2025-08-22',
        plannedQty: 80,
        actualQty: 60,
        machine: { hours: 6, units: 1 },
        reportLinks: [{ title: 'Замеры (xlsx)', href: '#' }]
      }
    };

    this.details = dict[id] ?? {
      assignees: ['—'],
      deadline: undefined,
      plannedQty: undefined,
      actualQty: undefined,
      machine: { hours: undefined, units: undefined },
      reportLinks: []
    };
  }

  get progressPercent(): number | null {
    const p = this.details.plannedQty;
    const a = this.details.actualQty;
    if (p && p > 0 && a != null) {
      return Math.min(100, Math.round((a / p) * 100));
    }
    return null;
  }

  // Навигация
  backToSubtasks(): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.id, 'stages', this.currentStage.id, 'tasks', this.currentTask?.task_id],
      { state: { project: this.currentProject, stage: this.currentStage, task: this.currentTask } }
    );
  }

  toTime(): void { this.router.navigate(['/']); }
  toTaskEmployees(): void { this.router.navigate(['/']); } // сотрудники именно этой подзадачи (будет позже)
}
