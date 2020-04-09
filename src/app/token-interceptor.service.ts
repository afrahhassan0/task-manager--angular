import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector: Injector ) { }

  public intercept( req:HttpRequest<any>, next:HttpHandler ){
    let myService = this.injector.get(UserService);

    let requestWithToken = req.clone({
      setHeaders:{
        Authorization: `Bearer ${myService.getToken()}`
      }
    });
    return next.handle(requestWithToken);
  }
}
