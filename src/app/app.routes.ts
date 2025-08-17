import { Routes } from '@angular/router';
import { Login } from './pages/login/login/login';
import { ManagerStart } from './pages/manager-start/manager-start';
import { ForemanStart } from './pages/foreman-start/foreman-start';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'manager', component: ManagerStart },
    { path: 'foreman', component: ForemanStart },
    { path: '**', redirectTo: '' }
];