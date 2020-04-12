import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from 'src/app/Models/Task';
import {BaseTaskService} from "./base-task.service";

@Injectable({
  providedIn:'root'
})
export class PersonalTaskService extends BaseTaskService{

  constructor( protected http: HttpClient ) {
    super(http);
  }


  put( taskId:number, task:Task ):Observable<any>{
    return this.http.put(this.personalUrl+taskId, task).pipe(
      catchError((err) => throwError(err)))
  }

  delete( taskId:number ):Observable<any>{
      return this.http.delete(this.personalUrl+taskId).pipe(
        catchError((err) => throwError(err)))
  }

  post ( task: Task): Observable<any>{
    return this.http.post(this.personalUrl, task).pipe(
      catchError((err) => throwError(err))
    );
  }

  get():Observable<any>{
    return this.http.get(this.personalUrl).pipe(
      catchError( (err) => throwError(err) )
    );
  }

  // private getsharedTasks( groupId:string ):Observable<any>{
  //   return this.http.get(this.sharedUrl + groupId).pipe(
  //     catchError( (err) => throwError(err) )
  //   )
  // }


}
