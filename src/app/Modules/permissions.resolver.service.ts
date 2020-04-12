import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {UserService} from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsResolverService implements Resolve<any> {

  constructor(private userService: UserService ) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const url: string[] = state.url.split("/");

      return this.userService.getGroupRole( parseInt(url[ url.length-1] ) );
  }

}
