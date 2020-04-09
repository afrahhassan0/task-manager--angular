import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPersonalComponent } from './dashboard-personal.component';
import { ResolverService } from './resolver.service';
import { BoardComponent } from './personal/board.component';
import { OrganizationboardsComponent } from './organizationboards/organizationboards.component';
import { MyboardsComponent } from './myboards/myboards.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [

  {
    path:"",
    component: DashboardPersonalComponent,
    children:[
      {
        path:"",
        redirectTo: "personal",
        pathMatch: "full",
      },
      {
        path: "personal",
        component: BoardComponent,
        resolve: { tasks: ResolverService }
     },
     {
       path: "adminboards",
       component: OrganizationboardsComponent,
       children:[{
         path:'board/:id',
         component: BoardComponent
       }]
     },
     {
      path:"myboards",
      component: MyboardsComponent
     },
     {
       path: "**",
       redirectTo: 'personal',
       pathMatch: "full"
     }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPersonalRoutingModule { }
