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
    this.projects = [
      { id: 1, name: 'Проект 1', activeTasks: 11, totalTasks: 31 },
      { id: 2, name: 'Проект 2', activeTasks: 17, totalTasks: 27 },
      { id: 3, name: 'Проект 3', activeTasks: 31, totalTasks: 378 },
      { id: 4, name: 'Проект 4', activeTasks: 1, totalTasks: 6 },
      { id: 5, name: 'Проект 5', activeTasks: 23, totalTasks: 109 },
      { id: 6, name: 'Проект 6', activeTasks: 40, totalTasks: 40 },
    ];
  }

  // Моковая реализация
  loadAllTasks(): void {
    this.tasks = [
      {
        id: 1,
        projectId: 1,
        title: 'Подготовка площадки',
        description: 'Очистка территории перед заливкой бетона',
        status: 'Завершено',
        assignee: 'Иванов И.',
        startTime: new Date('2023-04-15'),
        endTime: new Date('2023-07-13'),
      },
      {
        id: 2,
        projectId: 1,
        title: 'Армирование',
        description: 'Установка арматурного каркаса',
        status: 'В работе',
        assignee: 'Иванов И.',
        startTime: new Date('2023-05-10'),
        endTime: new Date('2023-06-10'),
      },
      {
        id: 3,
        projectId: 2,
        title: 'Подготовка площадки',
        description: 'Очистка территории перед заливкой бетона',
        status: 'Завершено',
        assignee: 'Иванов И.',
        startTime: new Date('2023-04-15'),
        endTime: new Date('2023-07-13'),
      },
      {
        id: 4,
        projectId: 2,
        title: 'Армирование',
        description: 'Установка арматурного каркаса',
        status: 'В работе',
        assignee: 'Иванов И.',
        startTime: new Date('2023-05-10'),
        endTime: new Date('2023-06-10'),
      },
      {
        id: 5,
        projectId: 3,
        title: 'Подготовка площадки',
        description: 'Очистка территории перед заливкой бетона',
        status: 'Завершено',
        assignee: 'Иванов И.',
        startTime: new Date('2023-04-15'),
        endTime: new Date('2023-07-13'),
      },
      {
        id: 6,
        projectId: 3,
        title: 'Армирование',
        description: 'Установка арматурного каркаса',
        status: 'В работе',
        assignee: 'Иванов И.',
        startTime: new Date('2023-05-10'),
        endTime: new Date('2023-06-10'),
      }
    ];
  }

  navigateToProject(project: Project): void {
    this.router.navigate(['/manager-project', project.id],
      { state: { project: project } }
    );
    // console.log("Send to next page:", project);
  }

  getProjectName(projectId: number): string {
    const project = this.projects.find(p => p.id === projectId);
    return project ? project.name : 'Неизвестный проект';
  }

  navigateToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  navigateToTimeTracking(): void {
    this.router.navigate(['/timeTracking'])
  }
}

