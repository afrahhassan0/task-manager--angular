import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {empty, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private colleaguesURL = 'http://localhost:5000/api/memberships/potentialmembers';
  private membershipGroupUrl = 'http://localhost:5000/api/memberships/group/';

  constructor(private http:HttpClient, private router: Router) { }

  public getColleagues():Observable<any>{
    return this.http.get(this.colleaguesURL).pipe(
      catchError(err=> {
        if(err.status == 401) {
          localStorage.removeItem("Authentication");
          localStorage.removeItem("userInfo");
          this.router.navigate(['welcome/login']);
        }
        return empty();
      })
    )
  }

  public postAll( groupId: number, memberUsername: string[] ): Observable<any> {
    const url = this.membershipGroupUrl + groupId;
  return  this.http.post( url, memberUsername ).pipe(
      catchError( err=> throwError(err) )
    );
  }

  public getMembers( groupId:number ){
    const url = this.membershipGroupUrl + groupId;
    return this.http.get( url ).pipe(
      catchError( err=> throwError(err) )
    );
  }

  public delete( groupId:number, memberUsername: string ){
    const url = this.membershipGroupUrl + groupId;
    return this.http.delete( url ).pipe(
      catchError( err=> throwError(err) )
    );
  }

}
