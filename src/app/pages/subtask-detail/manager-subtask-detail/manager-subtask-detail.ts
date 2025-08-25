import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  Task,
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

  currentProject: Project = { project_id: "0", project_name: 'Загрузка…', totalTasks: 0, activeTasks: 0 };
  currentStage: Stage = { id: '', title: 'Загрузка…', status: 'Planned' };
  currentTask: Task | null = null;
  currentSubtask: Subtask | null = null;

  subTaskDetails: SubtaskDetails = {
    assignees: [],
    deadline: undefined,
    plannedQty: undefined,
    actualQty: undefined,
    machine: { hours: undefined, units: undefined },
    reportLinks: []
  };

  ngOnInit(): void {
    this.loadDataFromPreviousPage();
    this.GetSubtaskDetailMOCK();
  }

  /** Заглушка деталей подзадачи:
   * В реальности эти поля прилетят отдельным API (loadSubtaskDetail method). Пока даём мок по subtask_id.
   */
  private GetSubtaskDetailMOCK(): void {
    const id = this.currentSubtask?.subtask_id ?? 'unknown';
    const dict: Record<string, SubtaskDetails> = {
      'st1': {
        assignees: ['Иванов И.', 'Петров П.'],
        deadline: '2025-08-20',
        plannedQty: 100,
        actualQty: 100,
        machine: { hours: 12, units: 3 },
        reportLinks: [
          { title: 'Акт №101 Update', href: '#' },
          { title: 'Фотоотчет', href: '#' },
        ]
      },
      'st2': {
        assignees: ['Сидоров С.'],
        deadline: '2025-08-22',
        plannedQty: 80,
        actualQty: 60,
        machine: { hours: 6, units: 1 },
        reportLinks: [{ title: 'Замеры (xlsx) Update', href: '#' }]
      }
    };

    this.subTaskDetails = dict[id] ?? {
      assignees: ['—'],
      deadline: undefined,
      plannedQty: undefined,
      actualQty: undefined,
      machine: { hours: undefined, units: undefined },
      reportLinks: []
    };
  }

  get progressPercent(): number | null {
    const p = this.subTaskDetails.plannedQty;
    const a = this.subTaskDetails.actualQty;
    if (p && p > 0 && a != null) {
      return Math.min(100, Math.round((a / p) * 100));
    }
    return null;
  }

  // Тут будет загрузка всей инфы по задаче из API
  loadSubtaskDetail(): void {

  }

  loadDataFromPreviousPage(): void {
    const st = history.state;
    if (st) {
      this.currentProject = st.project as Project;
      this.currentStage = st.stage as Stage;
      this.currentTask = st.task as Task;
      this.currentSubtask = st.subtask as Subtask;
      // console.warn(
      //   "Data from stage detail page: ",
      //   "\nProject: ", st.project,
      //   "\nStage: ", st.stage,
      //   "\nTask: ", st.workType,
      //   "\nSubtask: ", st.subtask);
    } else {
      console.error("State is empty!")
    }
  }

  // Навигация
  backToSubtasks(): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.project_id, 'stages', this.currentStage.id, 'tasks', this.currentTask?.task_id],
      { state: { project: this.currentProject, stage: this.currentStage, task: this.currentTask } }
    );
  }

  toTime(): void { this.router.navigate(['/']); }

  toTaskEmployees(): void { this.router.navigate(['/']); } // сотрудники именно этой подзадачи (будет позже)
}
