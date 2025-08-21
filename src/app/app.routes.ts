import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { ManagerStart } from './pages/start/manager-start/manager-start';
import { ForemanStart } from './pages/start/foreman-start/foreman-start';
import { ManagerProjectView } from './pages/project-view/manager-project-view/manager-project-view';
import { ManagerStageDetail } from './pages/stage-detail/manager-stage-detail/manager-stage-detail';
import { ManagerSubtask } from './pages/subtask/manager-subtask/manager-subtask';
import { ManagerSubtaskDetail } from './pages/subtask-detail/manager-subtask-detail/manager-subtask-detail';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'manager', component: ManagerStart },
    { path: 'foreman', component: ForemanStart },
    { path: 'manager-project/:projectId/stages/:stageId/tasks/:taskId/subtasks/:subtaskId', component: ManagerSubtaskDetail },
    { path: 'manager-project/:projectId/stages/:stageId/tasks/:taskId', component: ManagerSubtask },
    { path: 'manager-project/:projectId/stages/:stageId', component: ManagerStageDetail },
    { path: 'manager-project/:id', component: ManagerProjectView },
    { path: '**', redirectTo: '' }
];
