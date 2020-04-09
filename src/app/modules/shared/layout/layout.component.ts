import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  constructor(private router:Router, private toastr:ToastrService ) {

   }

  ngOnInit(): void {
  }


  public signout(){
    localStorage.removeItem("Authentication");
    localStorage.removeItem("userInfo");
    this.router.navigate(['welcome/login']);
    this.toastr.show("","Signing you out")
  }
}
