import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager-service/manager-service';
import { Project, Task } from '../../../services/manager-service/manager-service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-start',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-start.html',
  styleUrl: './manager-start.css'
})
export class ManagerStart implements OnInit, OnDestroy {
  projects: Project[] = [];
  tasks: Task[] = [];
  searchControl = new FormControl("");


  constructor(
    private router: Router,
    private managerService: ManagerService,
  ) { };

  ngOnInit(): void {
    /// Должны будут дергать API
    this.loadProjectData();
    this.loadAllTasks();
  }



  ngOnDestroy(): void {

  }

  // Моковая реализация
  loadProjectData(): void {
    this.managerService.getProjetcs().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  // Переделать метод в Service (пока моковый идет)
  loadAllTasks(): void {
    this.managerService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  navigateToProject(project: Project): void {
    this.router.navigate(['/manager-project', project.project_id],
      { state: { project: project } }
    );
    // console.log("Send to next page:", project);
  }

  getProjectName(projectId: string): string {
    const project = this.projects.find(p => p.project_id === projectId);
    return project ? project.project_name : 'Неизвестный проект';
  }

  navigateToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  navigateToTimeTracking(): void {
    this.router.navigate(['/timeTracking'])
  }
}

