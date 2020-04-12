import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { PersonalTaskService } from '../Services/personal.task.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {SharedTaskService} from '../Services/shared-task.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {UserService} from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(
    private personalTaskService: PersonalTaskService,
    private sharedTaskService: SharedTaskService,
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private userService: UserService
  ) {
  }

  /*
    resolver responsible for calling the appropriate get method depending on the url
    this resolver will be called if the url:
    - /dashboard/personal
    - /dashboard/shared/group/:id
  */

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const url: string[] = state.url.split("/")
    if( url.includes("personal") ){
      return this.personalTaskService.get().pipe(
        catchError((err) => {
          if (err.status == 401)
            this.authenticate();
          return empty();
        }))
    }

    if( url.includes("group")){
      const groupId = url[url.length-1]; //last item
      if(isNaN(parseInt( groupId))){
        this.router.navigate(['../'] );
        return empty();
      }else{
        return this.sharedTaskService.get( parseInt(groupId) ).pipe(
          catchError((err) => {
            if (err.status == 401)
              this.authenticate();
            return empty();
          }))
      }
    }
  }

  private authenticate(){
    localStorage.removeItem("Authentication");
    localStorage.removeItem("userInfo");
    this.router.navigate(['welcome/login']);
  }
}
