import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-grp',
  template:`
    <div class="title">
      <h1>Welcome to TaskIT</h1>
      <p>Organize your work</p>
    </div>
    <div class="btn-group">
      <button [routerLink]="['/welcome/signup']"> Join Us </button>
      <a href=# [routerLink]="['/welcome/login']">Or Sign in</a>
    </div>
  `,
  styleUrls: ['./button-grp.component.css']
})
export class ButtonGrpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
