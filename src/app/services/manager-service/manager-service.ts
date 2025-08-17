import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  activeTasks: number;
  totalTasks: number;
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: string;
  assignee: string;
  startTime: Date;
  endTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseApiUrl = '/api'

  constructor(private http: HttpClient) { }

  getProjetcs(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}`);
  }

  getCurrentTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks/current`);
  }

}
