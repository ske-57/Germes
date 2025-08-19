import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

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

export interface Stage {
  id: string;
  title: string;
  description?: string;
  status?: 'Planned' | 'InProgress' | 'Done';
}

export interface WorkType {
  id: string;
  name: string;
  description?: string;
  status?: 'Запланировано' | 'В работе' | 'Готово';
  executor?: string;
  deadline?: string | Date;
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

  // Заглушка получения видов работ по этапу
  getWorkTypesByStage(stageId: string): Observable<WorkType[]> {
    const mock: Record<string, WorkType[]> = {
      '1': [
        { id: 'a', name: 'устройство покрытий и так далее', status: 'В работе' },
        { id: 'b', name: 'Подготовка территорий', status: 'Запланировано' },
      ],
      '2': [
        { id: 'c', name: 'Монтаж основания', status: 'Готово' },
        { id: 'd', name: 'Промеры/геодезия', status: 'Запланировано' },
      ],
      '3': [
        { id: 'e', name: 'Разметка', status: 'В работе' },
        { id: 'f', name: 'Отсыпка', status: 'Запланировано' },
      ],
    };
    return of(mock[stageId] ?? []).pipe(delay(200));
  }
}