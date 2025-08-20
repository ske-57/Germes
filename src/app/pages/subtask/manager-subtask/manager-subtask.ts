import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  WorkTypeTask,
  Subtask
} from '../../../services/manager-service/manager-service';

@Component({
  selector: 'app-manager-subtask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-subtask.html',
  styleUrl: './manager-subtask.css'
})
export class ManagerSubtask implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService
  ) { }

  currentProject: Project = { id: 0, name: 'Загрузка…', totalTasks: 0, activeTasks: 0 };
  currentStage: Stage = { id: '', title: 'Загрузка…', status: 'Planned' };
  currentTask: WorkTypeTask | null = null;

  subtasks: Subtask[] = [];
  searchControl = new FormControl('');

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.currentProject = (nav.extras.state['project'] as Project) ?? this.currentProject;
      this.currentStage = (nav.extras.state['stage'] as Stage) ?? this.currentStage;
      this.currentTask = (nav.extras.state['subtask'] as WorkTypeTask) ?? this.currentTask;
      this.subtasks = this.currentTask?.subtasks ?? [];
    }

    this.route.paramMap.subscribe(p => {
      const projectId = p.get('projectId');
      const stageId = p.get('stageId');
      const taskId = p.get('subtaskId');

      if (projectId && !nav?.extras.state) {
        this.currentProject = { id: +projectId, name: `Проект ${projectId}`, totalTasks: 0, activeTasks: 0 };
      }
      if (stageId && !nav?.extras.state) {
        this.currentStage = { id: stageId, title: `Этап ${stageId}`, status: 'InProgress' };
      }

      if (stageId && taskId && !this.currentTask) {
        // восстанавливаем таск по JSON-заглушке
        this.manager.getWorkTypesByStageJSON(stageId).subscribe(tasks => {
          this.currentTask = tasks.find(t => t.task_id === taskId) ?? null;
          this.subtasks = this.currentTask?.subtasks ?? [];
        });
      }
    });
  }

  backToTasks(): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.id, 'stages', this.currentStage.id],
      { state: { project: this.currentProject, stage: this.currentStage } }
    );
  }

  toTime(): void {
    this.router.navigate(['/']);
  }

  toTaskEmployees(): void {
    // Заглушка — переход к списку сотрудников данного WorkType
    console.log("Открыть сотрудников для", this.currentTask?.task_name);
    this.router.navigate(['/']); // потом можно заменить на реальный роут
  }

  openSubtask(s: Subtask): void {
    // заглушка: переход в детальную задачу/таймшиты и т.п.
    console.log('open subtask', s.subtask_id);
  }

  hasActiveInterval(s: Subtask): boolean {
    return (s.time_intervals ?? []).some(t => t.status === 'active');
  }
}
