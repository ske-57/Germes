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

// Под JSON ответ
export interface TimeInterval {
  start_time: string;
  end_time?: string;
  status: 'closed' | 'active' | string;
}

export interface Subtask {
  subtask_id: string;
  subtask_name: string;
  subtask_description?: string;
  subtask_status?: string;
  time_intervals?: TimeInterval[];
}

export interface WorkType {
  task_id: string;
  task_name: string;
  task_description?: string;
  task_status?: string;
  time_intervals?: TimeInterval[];
  subtasks?: Subtask[];
}

@Injectable({ providedIn: 'root' })
export class ManagerService {
  private baseApiUrl = '/api';

  constructor(private http: HttpClient) { }

  getProjetcs(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}`);
  }

  getCurrentTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks/current`);
  }

  // JSON-ответ с task/subtasks как по API
  getWorkTypesByStageJSON(stageId: string): Observable<WorkType[]> {
    const mock: WorkType[] = [
      {
        task_name: 'Подготовка площадки',
        task_description: 'Очистка территории перед заливкой бетона',
        task_status: 'Завершено',
        subtasks: [
          {
            subtask_name: 'Вывоз мусора',
            subtask_id: 'st1',
            subtask_description: 'Убрать строительный мусор',
            time_intervals: [
              { start_time: '2025-08-16T08:00:00', end_time: '2025-08-16T17:00:00', status: 'closed' }
            ],
            subtask_status: 'Завершено'
          },
          {
            subtask_name: 'Разметка территории',
            subtask_id: 'st2',
            subtask_description: 'Разметить границы фундамента',
            time_intervals: [
              { start_time: '2025-08-16T08:00:00', end_time: '2025-08-16T17:00:00', status: 'closed' }
            ],
            subtask_status: 'Завершено'
          }
        ],
        task_id: 't1'
      },
      {
        task_name: 'Армирование',
        task_description: 'Установка арматурного каркаса',
        task_status: 'В работе',
        time_intervals: [
          { start_time: '2025-08-16T08:00:00', end_time: '2025-08-16T17:00:00', status: 'closed' },
          { start_time: '2025-08-17T08:00:00', status: 'active' }
        ],
        task_id: 't2'
      },
      {
        task_name: 'Первая линия кладки',
        task_description: 'Укладка первого ряда кирпичей',
        time_intervals: [],
        task_id: 't3'
      }
    ];
    return of(mock);
  }
}
