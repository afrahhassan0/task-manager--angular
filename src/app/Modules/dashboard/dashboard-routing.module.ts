import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ResolverService } from '../resolver.service';
import { UserBoardComponent } from './userboard/user.board.component';
import { GroupListComponent } from '../groups/groupList/group.list.component';
import { GroupComponent } from '../groups/group/group.component';
import {PermissionsResolverService} from '../permissions.resolver.service';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal',
        pathMatch: 'full',
      },
      {
        path: 'personal',
        component: UserBoardComponent,
        resolve: { tasks: ResolverService }
     },
      {
        path: 'shared',
        children: [
          { path: '', component: GroupListComponent },
          { path: 'group/:id', component: GroupComponent, resolve: { tasks: ResolverService, perm: PermissionsResolverService } },
        ]
      },
      {
        path: 'org',
        children: [
          { path: '', component: GroupListComponent },
          { path: 'group/:id', component: GroupComponent, resolve: { tasks: ResolverService, perm: PermissionsResolverService } },
        ]
      }

   ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
