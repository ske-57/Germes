import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  Task
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

  currentProject: Project = { project_id: "0", project_name: 'Загрузка…', totalTasks: 0, activeTasks: 0 };
  currentStage: Stage = { id: '', title: 'Загрузка…', status: 'Planned' };

  // вместо WorkType[] теперь tasks из JSON
  tasks: Task[] = [];

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.loadDataFromPreviousPage();
    this.loadTasks(this.currentStage.id)
  }

  ngOnDestroy(): void { }

  loadDataFromPreviousPage(): void {
    const st = history.state;
    if (!st.project) {
      console.error("Data from project view is null")
    } else {
      if (st?.project) this.currentProject = st.project as Project;
      if (st?.stage) this.currentStage = st.stage as Stage;
      // console.log(
      //   "Data from project view page: ",
      //   "\nProject: ", st.project,
      //   "\nStage: ", st.stage);
    }
  }

  // Должен будет быть запрос из API (сейчас в manager лежат моки)
  loadTasks(stageId: string): void {
    this.manager.getTasks(stageId).subscribe(
      res => this.tasks = res
    );
  }

  backToStages(): void {
    this.router.navigate(['/manager-project', this.currentProject.project_id],
      { state: { project: this.currentProject } }
    );
  }

  toTime(): void { this.router.navigate(['/']); }
  toEmployees(): void { this.router.navigate(['/']); }

  openTask(task: Task): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.project_id, 'stages', this.currentStage.id, 'tasks', task.task_id],
      { state: { project: this.currentProject, stage: this.currentStage, task: task } }
    );
    // console.log(
    //   "Send to subtasks page: ",
    //   "\nProject: ", this.currentProject,
    //   "\nStage: ", this.currentStage,
    //   "\nTask: ", task)
  }
}
