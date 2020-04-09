import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from 'src/app/Models/Task';

@Injectable({
  providedIn:'root'
})
export class TaskService {
  private personalUrl="http://localhost:5000/api/privatetasks/"
  private sharedUrl = "http://localhost:5000/api/sharedtasks/"

  constructor( private http: HttpClient ) { }

  public getTasks(endpoint = "personal" || "shared", id? ):Observable<any>{
    switch(endpoint){
      case "personal":
        return this.getPrivateTasks();
      case "shared":
        if(id==null) throw "need id";
        else return this.getsharedTasks(id);
    }
  }

  public updateTask( id:number, taskToUpdate:Task, groupId?:number ,endpoint= "personal" || "shared" ):Observable<any>{
    switch(endpoint){
      case "personal":
        return this.updatePrivateTask(id, taskToUpdate);
      case "shared":
        return this.updateSharedTask( id, groupId, taskToUpdate )
    }
  }

  private updatePrivateTask( id:number, task:Task ):Observable<any>{
    return this.http.put(this.personalUrl+id, task).pipe(
      catchError((err) => throwError(err)))
  }

  private updateSharedTask(id:number, groupId:number ,task:Task):Observable<any>{
      return from("hey");
  }

  public deletePersonalTask(id):Observable<any>{
      return this.http.delete(this.personalUrl+id).pipe(
        catchError((err) => throwError(err)))
  }

  public createAPrivateTask(task: Task):Observable<any>{
    return this.http.post(this.personalUrl, task).pipe(
      catchError((err) => throwError(err))
    );
  }

  private getPrivateTasks():Observable<any>{
    return this.http.get(this.personalUrl).pipe(
      catchError( (err) => throwError(err) )
    );
  }

  private getsharedTasks( groupId:string ):Observable<any>{
    return this.http.get(this.sharedUrl + groupId).pipe(
      catchError( (err) => throwError(err) )
    )
  }


}
