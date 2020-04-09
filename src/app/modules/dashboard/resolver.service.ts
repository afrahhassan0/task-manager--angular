import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { TaskService } from './task.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor( private httpService :TaskService, private router: Router) { }
  /*
    resolver responsible for calling the appropriate get method depending on the url
    this resolver will be called if the url:
    - /dashboard/personal
    - /dashboard/[admin|myboards]/board/:id

  */

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):Observable<any>
  {

    const url:string[] = state.url.split("/");
    let requestedSection = url[2];
    let id;
    if( requestedSection!= "personal" ){
      //getTasks method then needs parameter "shared" and a groupId
      requestedSection = "shared";
      id = state.url[4];
      console.log("missing")
      if(!id) this.router.navigate( [ '../' ] )
    }

    return this.httpService.getTasks(requestedSection , id).pipe(
      catchError((err)=> {
        if(err.status == 401) {
          localStorage.removeItem("Authentication");
          localStorage.removeItem("userInfo");
          this.router.navigate(['welcome/login']);
        }
        return empty();
      }))
  }

}
