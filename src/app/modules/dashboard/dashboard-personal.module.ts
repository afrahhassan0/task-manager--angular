import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPersonalRoutingModule } from './dashboard-personal-routing.module';
import { DashboardPersonalComponent } from './dashboard-personal.component';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './personal/board.component';
import { MyboardsComponent } from './myboards/myboards.component';
import { OrganizationboardsComponent } from './organizationboards/organizationboards.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GroupComponent } from './group/group.component';



@NgModule({
  declarations: [ DashboardPersonalComponent, BoardComponent, MyboardsComponent, OrganizationboardsComponent, GroupComponent ],
  imports: [
    CommonModule,
    DashboardPersonalRoutingModule,
    SharedModule,
    DragDropModule
  ],
})
export class DashboardPersonalModule { }
