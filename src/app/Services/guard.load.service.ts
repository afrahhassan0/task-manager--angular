import {CanLoad, Route, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  constructor(private router: Router, private userService: UserService ) {
  }

  canLoad(route: Route): boolean {
    if( this.userService.isLoggedIn() )
      return true;

    this.router.navigate(['../welcome/login']);

    return false;
  }
}
