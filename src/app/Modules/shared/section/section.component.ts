import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPersonalFormComponent } from '../add-personal-form/add-personal-form.component';
import { Task } from 'src/app/Models/Task';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input() info;
  @Input() disableDrag:boolean = false;
  @Input() private groupId:number;
  @Output() triggerDialog = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<number>();

  constructor( private permissionsService: NgxPermissionsService ) {
  }

  public activateDialog(selected :Task){
    this.triggerDialog.emit( { task: selected, type: null } );
  }

  public addTaskDialog(status: string){
    this.triggerDialog.emit( {task:null, type: status} );
  }

  deleteTask(event, clickedId: number, ){
    event.stopPropagation();
    const index = this.info.data.findIndex( data => data.taskId == clickedId );
    this.info.data.splice( index, 1 );
    this.deleteClicked.emit( clickedId );
  }
}

