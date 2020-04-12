import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {Task} from "../Models/Task";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseTaskService {
  protected personalUrl="http://localhost:5000/api/privatetasks/";
  protected sharedUrl = "http://localhost:5000/api/sharedtasks/";

  protected  constructor( protected http: HttpClient) { }

  abstract get( groupId?:number ):Observable<any>;
  abstract post( task:Task , groupId?:number ):Observable<any>;
  abstract put( taskId:number, task:Task ,groupId?:number ):Observable<any>;
  abstract delete( taskId:number ):Observable<any>;


}
