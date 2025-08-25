import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  Task,
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

  currentProject: Project = { project_id: "0", project_name: 'Загрузка…', totalTasks: 0, activeTasks: 0 };
  currentStage: Stage = { id: '', title: 'Загрузка…', status: 'Planned' };
  currentTask: Task | null = null;

  subtasks: Subtask[] = [];
  searchControl = new FormControl('');

  ngOnInit(): void {
    // Оба метода загружают информацию с предыдущей страницы
    this.loadDataFromPreviousPage();
    this.loadSubtasks();
  }

  loadDataFromPreviousPage(): void {
    const st = history.state;
    if (st) {
      this.currentProject = st.project as Project;
      this.currentStage = st.stage as Stage;
      this.currentTask = st.task as Task;
      // console.log(
      //   "Data from stage detail page: ",
      //   "\nProject: ", st.project,
      //   "\nStage: ", st.stage,
      //   "\WorkTypes: ", st.task);
    } else {
      console.error("State is empty!")
    }
  }

  loadSubtasks(): void {
    if (this.currentTask?.subtasks) {
      this.subtasks = this.currentTask?.subtasks;
    }
    else {
      console.error(
        "Subtasks or Task is empty",
        "\nTask: ", this.currentTask,
        "\nSubtasks: ", this.subtasks);
    }
  }

  backToTasks(): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.project_id, 'stages', this.currentStage.id],
      { state: { project: this.currentProject, stage: this.currentStage } }
    );
  }

  toTime(): void {
    this.router.navigate(['/']);
  }

  toTaskEmployees(): void {
    // Заглушка — переход к списку сотрудников данного WorkType
    console.log("Открыть сотрудников для", this.currentTask?.task_name);
    this.router.navigate(['/']); // потом заменить на реальный роут
  }

  openSubtask(subtask: Subtask): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.project_id, 'stages', this.currentStage.id, 'tasks', this.currentTask?.task_id, 'subtasks', subtask.subtask_id],
      { state: { project: this.currentProject, stage: this.currentStage, task: this.currentTask, subtask: subtask } }
    );
    // console.log(
    //   "Send to subtask detail page: ",
    //   "\nTask: ", this.currentTask,
    //   "\nSubtasks: ", this.subtasks);
  }

  hasActiveInterval(s: Subtask): boolean {
    return (s.time_intervals ?? []).some(t => t.status === 'active');
  }
}
