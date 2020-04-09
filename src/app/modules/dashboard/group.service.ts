import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, empty } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl="http://localhost:5000/api/group";
  private colleaguesURL="http://localhost:5000/api/memberships/potentialmembers";
  constructor(private http:HttpClient, private router: Router) { }


  public getGroups():Observable<any>{
    return this.http.get(this.groupUrl).pipe(
      catchError((err)=> throwError(err))
    )
  }

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
}
