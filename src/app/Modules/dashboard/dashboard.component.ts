import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-personal',
  template: `<app-layout>
    <router-outlet style="display: block;"></router-outlet>
  </app-layout>`
})
export class DashboardComponent {
    constructor() { }
}
