import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UserService} from '../../../Services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public isAdmin:boolean;
  public user;

  constructor(private router:Router, private toastr:ToastrService, private userService: UserService ) {
      this.isAdmin = (this.userService.getRole() == 0);
   }

  ngOnInit(): void {
    this.user = this.userService.getUsername();
  }


  public signout(){
    localStorage.removeItem("Authentication");
    localStorage.removeItem("userInfo");
    this.router.navigate(['welcome/login']);
    this.toastr.show("","Signing you out")
  }
}
