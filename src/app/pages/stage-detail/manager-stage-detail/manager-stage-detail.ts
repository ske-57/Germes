// pages/manager-stage-detail/manager-stage-detail.ts
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService, Project, Stage, WorkType } from '../../../services/manager-service/manager-service';

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
  workTypes: WorkType[] = [];
  searchControl = new FormControl('');

  ngOnInit(): void {
    // получаем из state (если переходили кликом) или из параметров урла
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.currentProject = nav.extras.state['project'] as Project ?? this.currentProject;
      this.currentStage = nav.extras.state['stage'] as Stage ?? this.currentStage;
    }
    this.route.paramMap.subscribe(p => {
      const projectId = p.get('projectId');
      const stageId = p.get('stageId');
      if (projectId && !nav?.extras.state) {
        // оставляю заглушку, но можно дернуть API метод
        this.currentProject = { id: +projectId, name: `Проект ${projectId}`, totalTasks: 0, activeTasks: 0 };
      }
      if (stageId) {
        if (!nav?.extras.state) this.currentStage = { id: stageId, title: `Этап ${stageId}`, status: 'InProgress' };
        this.loadWorkTypes(stageId);
      }
    });
  }

  ngOnDestroy(): void { }

  loadWorkTypes(stageId: string): void {
    this.manager.getWorkTypesByStage(stageId).subscribe(items => this.workTypes = items);
  }

  backToStages(): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.id],
      { state: { project: this.currentProject } }
    );
  }

  toTime(): void {
    // заглушка
    this.router.navigate(['/']);
  }

  toEmployees(): void {
    // заглушка
    this.router.navigate(['/']);
  }

  openWorkType(wt: WorkType): void {
    // задел на будущее — переход к задачам вида работ
    this.router.navigate(['/']); // позже замените на реальный роут
  }
}
