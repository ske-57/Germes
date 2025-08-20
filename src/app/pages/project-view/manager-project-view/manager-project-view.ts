import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Stage } from '../../../services/manager-service/manager-service';

@Component({
  selector: 'app-manager-project-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-project-view.html',
  styleUrl: './manager-project-view.css'
})
export class ManagerProjectView implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  currentProject: Project = {
    "id": 0,
    "name": "Загрузка...",
    "activeTasks": 0,
    "totalTasks": 0,
  };
  currentTasks: any;
  searchControl = new FormControl("");
  currentStages: Stage[] = [];

  ngOnInit(): void {
    this.loadProjectData();
    this.loadStages();
  }

  ngOnDestroy(): void { }

  loadProjectData(): void {
    // Сначала пробуем получить данные из state (при переходе с главной)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.currentProject = navigation.extras.state['project'] as Project;
      return;
    }

    // Если данных нет в state (прямой переход по URL), загружаем по ID из параметров
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      if (projectId) {
        this.fetchProjectFromApi(parseInt(projectId));
      } else {
        this.currentProject = { id: 0, name: "Проект не найден", totalTasks: 0, activeTasks: 0 };
      }
    })
  }

  fetchProjectFromApi(projectId: number): void {
    // Имитация загрузки данных из API
    // this.isLoading = true;

    setTimeout(() => {
      // Здесь должен быть реальный API вызов
      const mockProjects: Project[] = [
        { id: 1, name: 'Проект 1', activeTasks: 11, totalTasks: 31 },
        { id: 2, name: 'Проект 2', activeTasks: 17, totalTasks: 27 },
        { id: 3, name: 'Проект 3', activeTasks: 31, totalTasks: 378 },
        { id: 4, name: 'Проект 4', activeTasks: 1, totalTasks: 6 },
        { id: 5, name: 'Проект 5', activeTasks: 23, totalTasks: 109 },
        { id: 6, name: 'Проект 6', activeTasks: 40, totalTasks: 40 },
      ];

      const project = mockProjects.find(p => p.id === projectId);

      if (project) {
        this.currentProject = project;
      } else {
        this.currentProject = { id: projectId, name: "Проект не найден", activeTasks: 0, totalTasks: 0 };
      }

      // this.isLoading = false;
    }, 1); // Имитация задержки сети
  }

  loadStages(): void {
    // Загрузка этапов проекта (потом будем из APi)
    this.currentStages = [
      {
        "id": "1",
        "title": "Этап первый",
        "description": "Че-то делаем",
        "status": "Done",
      },
      {
        "id": "2",
        "title": "Этап второй",
        "description": "Че-то делаем",
        "status": "Planned",
      },
      {
        "id": "3",
        "title": "Этап третий",
        "description": "Че-то делаем",
        "status": "InProgress",
      },
    ];
  }

  openStage(stage: Stage): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.id, 'stages', stage.id],
      { state: { project: this.currentProject, stage } }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/manager']);
  }

  navigateToProjectEmployees(): void {
    this.router.navigate(['/']);
  }

  navigateToTimeTracking(): void {
    this.router.navigate(['/']);
  }
}