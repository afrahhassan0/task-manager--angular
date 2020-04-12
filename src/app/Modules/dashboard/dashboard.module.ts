import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { UserBoardComponent } from './userboard/user.board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutComponent} from './layout/layout.component';
import {GroupsModule} from '../groups/groups.module';
import {NgxPermissionsModule} from 'ngx-permissions';



@NgModule({
  declarations: [ DashboardComponent, UserBoardComponent, LayoutComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    DragDropModule,
    GroupsModule,
    NgxPermissionsModule.forChild()
  ],
})
export class DashboardModule { }
