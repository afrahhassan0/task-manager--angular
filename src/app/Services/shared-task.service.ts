import { Injectable } from '@angular/core';
import {BaseTaskService} from './base-task.service';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Task } from '../Models/Task';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedTaskService extends BaseTaskService {

  constructor( protected http: HttpClient) {
    super(http);
  }

  delete(taskId: number ): Observable<any> {
    const url = this.sharedUrl + taskId;
    return this.http.delete( url ).pipe(
      catchError ( err => throwError(err))
    );
  }

  get(groupId: number): Observable<any> {
    const url = this.sharedUrl + groupId;
    return this.http.get(url);
  }

  post(task: Task, groupId: number): Observable<any> {
    const url = this.sharedUrl + 'group/' + groupId;
    return this.http.post( url , task ).pipe(
      catchError ( err => throwError(err))
    );
  }

  put(taskId: number, task: Task, groupId: number): Observable<any> {
    const url = this.sharedUrl + 'group/' + groupId + 'task/' + taskId;
    return this.http.put( url ,task ).pipe(
      catchError ( err => throwError(err))
    );
  }



}
