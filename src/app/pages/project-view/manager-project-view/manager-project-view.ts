import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService, Project, Stage } from '../../../services/manager-service/manager-service';

@Component({
  selector: 'app-manager-project-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-project-view.html',
  styleUrl: './manager-project-view.css'
})
export class ManagerProjectView implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private managerService: ManagerService,
  ) { }

  currentProject: Project = {
    "id": 0,
    "name": "Загрузка...",
    "activeTasks": 0,
    "totalTasks": 0,
  };
  // currentTasks: any;
  searchControl = new FormControl("");
  stages: Stage[] = [];

  ngOnInit(): void {
    this.loadDataFromPreviousPage();
    // Должен дергать API
    this.loadStages();
  }

  ngOnDestroy(): void { }

  loadDataFromPreviousPage(): void {
    const st = history.state;
    if (st?.project) {
      this.currentProject = st.project as Project;
      // console.log("Data from start page", st.project);
    } else {
      console.error("State is empty!");
      this.router.navigate(['/manager']);
      return;
    }
  }

  // fetchProjectFromApi(projectId: number): void {
  //   // Должен быть API запрос
  // }

  loadStages(): void {
    // Загрузка этапов проекта (потом будем из APi)
    this.stages = [
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
      { state: { project: this.currentProject, stage: stage } }
    );
    // console.log(
    //   "Send to stage detail page:",
    //   "\nProject: ", this.currentProject,
    //   "\nStage: ", stage);
  }

  navigateBack(): void {
    this.router.navigate(['/manager']);
  }

  navigateToProjectEmployees(): void {
    this.router.navigate(['/']);
  }

  toTime(): void {
    this.router.navigate(['/']);
  }
}