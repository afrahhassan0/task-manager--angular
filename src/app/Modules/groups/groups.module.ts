import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupListComponent} from './groupList/group.list.component';
import {GroupComponent} from './group/group.component';
import {SharedModule} from '../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxPermissionsModule, NgxPermissionsRestrictStubModule} from 'ngx-permissions';


@NgModule({
  declarations: [GroupListComponent, GroupComponent],
    imports: [
        CommonModule,
        SharedModule,
        DragDropModule,
        NgxPermissionsModule
    ]
})
export class GroupsModule { }
