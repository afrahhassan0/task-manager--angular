import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcomepage/welcome/welcome.component';
import { LoginComponent } from './welcomepage/login/login.component';
import { SignupComponent } from './welcomepage/signup/signup.component';
import { ButtonGrpComponent } from './welcomepage/button-grp/button-grp.component';
import {AuthGuardService} from './Services/guard.load.service';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    children:[
      { path:'', component: ButtonGrpComponent },
      { path:"login" , component: LoginComponent },
      { path:"signup", component: SignupComponent },
      { path: "**", redirectTo: "login" , pathMatch:"full" }
    ]
  },
  {
    path: "dashboard",
    loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuardService]
  },
  {
    path: "",
    redirectTo: 'welcome',
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
