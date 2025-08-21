import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  WorkTypeTask,   // ⬅️ берём новый тип
} from '../../../services/manager-service/manager-service';

@Component({
  selector: 'app-manager-stage-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-stage-detail.html',
  styleUrl: './manager-stage-detail.css'
})
export class ManagerStageDetail implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService
  ) { }

  currentProject: Project = { id: 0, name: 'Загрузка…', totalTasks: 0, activeTasks: 0 };
  currentStage: Stage = { id: '', title: 'Загрузка…', status: 'Planned' };

  /** ⬇️ вместо WorkType[] теперь tasks из JSON */
  tasks: WorkTypeTask[] = [];

  searchControl = new FormControl('');

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.currentProject = (nav.extras.state['project'] as Project) ?? this.currentProject;
      this.currentStage = (nav.extras.state['stage'] as Stage) ?? this.currentStage;
    }
    this.route.paramMap.subscribe(p => {
      const projectId = p.get('projectId');
      const stageId = p.get('stageId');
      if (projectId && !nav?.extras.state) {
        this.currentProject = { id: +projectId, name: `Проект ${projectId}`, totalTasks: 0, activeTasks: 0 };
      }
      if (stageId) {
        if (!nav?.extras.state) this.currentStage = { id: stageId, title: `Этап ${stageId}`, status: 'InProgress' };
        this.loadTasks(stageId);
      }
    });
  }

  ngOnDestroy(): void { }

  // грузим JSON-структуру
  loadTasks(stageId: string): void {
    this.manager.getWorkTypesByStageJSON(stageId).subscribe(res => this.tasks = res);
  }

  backToStages(): void {
    this.router.navigate(['/manager-project', this.currentProject.id], { state: { project: this.currentProject } });
  }

  toTime(): void { this.router.navigate(['/']); }
  toEmployees(): void { this.router.navigate(['/']); }

  openTask(t: WorkTypeTask): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.id, 'stages', this.currentStage.id, 'tasks', t.task_id],
      { state: { project: this.currentProject, stage: this.currentStage, task: t } }
    );
  }
}
