import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { ManagerStart } from './pages/manager-start/manager-start';
import { ForemanStart } from './pages/foreman-start/foreman-start';
import { ManagerProjectView } from './pages/project-view/manager-project-view/manager-project-view';
import { ManagerStageDetail } from './pages/stage-detail/manager-stage-detail/manager-stage-detail';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'manager', component: ManagerStart },
    { path: 'foreman', component: ForemanStart },
    { path: 'manager-project/:id', component: ManagerProjectView },
    { path: 'manager-project/:projectId/stages/:stageId', component: ManagerStageDetail },
    { path: '**', redirectTo: '' }
];