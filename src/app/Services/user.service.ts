import { Injectable } from '@angular/core';
import { UserLogin } from '../Models/UserLogin';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserSignup } from '../Models/UserSignup';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "http://localhost:5000/api/users";
  private loginUrl: string = "/login";
  private singupUrl:string = "/signup"

  constructor( private http: HttpClient ) { }

  public login( user: UserLogin ):Observable<any>{
    const url = this.baseUrl + this.loginUrl;
    return this.http.post( url, user, {observe: 'response' as 'body' } ).pipe(
      catchError( err=> throwError(err) )
    );
  }

  public signup( user: UserSignup ):Observable<any>{
    const url = this.baseUrl + this.singupUrl;
    return this.http.post( url, user, {observe: 'response' as 'body' } ).pipe(
      catchError( err=> throwError(err) )
    );
  }

  public  getGroupRole( groupId:number ):Observable<any>{
    const url = this.baseUrl + "/authorization/" + groupId;
    return this.http.get( url ).pipe(
      catchError( err=> throwError(err) )
    );
  }

  public getToken(){
    return localStorage.getItem("Authentication");
  }

  public getRole(){
    return JSON.parse(localStorage.getItem("userInfo")).role;
  }

  public getUsername() : string{
    return JSON.parse(localStorage.getItem("userInfo")).username;
  }

  public isLoggedIn(){
    return (localStorage.getItem("Authentication") != null )
  }
}
