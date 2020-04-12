import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import {Group} from '../Models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl="http://localhost:5000/api/group/";
  private colleaguesURL="http://localhost:5000/api/memberships/potentialmembers";
  constructor(private http:HttpClient, private router: Router) { }


  public getGroups():Observable<any>{
    return this.http.get(this.groupUrl).pipe(
      catchError((err)=> throwError(err))
    )
  }

  public post( group ):Observable<any>{
    return this.http.post(this.groupUrl, group).pipe(
      catchError((err)=> throwError(err))
    )
  }

  public put(groupId:number, group:Group ):Observable<any> {
    const url = this.groupUrl + groupId;
    return this.http.put(url, group).pipe(
      catchError( (err) => throwError(err))
    );
  }

  public delete( groupId: number ): Observable<any> {
    const url = this.groupUrl + groupId;
    return this.http.delete( url ).pipe(
      catchError( err => throwError(err) )
    );
  }
}
