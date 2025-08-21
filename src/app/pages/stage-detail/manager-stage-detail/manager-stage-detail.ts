import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ManagerService,
  Project,
  Stage,
  WorkType,
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

  // вместо WorkType[] теперь tasks из JSON
  workTypes: WorkType[] = [];

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
    this.manager.getWorkTypesByStageJSON(stageId).subscribe(
      res => this.workTypes = res
    );
  }

  backToStages(): void {
    this.router.navigate(['/manager-project', this.currentProject.id],
      { state: { project: this.currentProject } }
    );
  }

  toTime(): void { this.router.navigate(['/']); }
  toEmployees(): void { this.router.navigate(['/']); }

  openTask(workType: WorkType): void {
    this.router.navigate(
      ['/manager-project', this.currentProject.id, 'stages', this.currentStage.id, 'tasks', workType.task_id],
      { state: { project: this.currentProject, stage: this.currentStage, workType: workType } }
    );
    // console.log(
    //   "Send to subtasks page: ",
    //   "\nProject: ", this.currentProject,
    //   "\nStage: ", this.currentStage,
    //   "\nTask: ", task)
  }
}
