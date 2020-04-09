import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFormComponent } from '../../shared/add-form/add-form.component';
import { Task } from 'src/app/Models/Task';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input() info;
  @Input() private groupId:number;

  constructor(private dialog: MatDialog, private userRole:UserService) {

  }

  public activateDialog(selected :Task){
    this.openDialog({ task: selected, type: null });
  }

  public addTaskDialog(status: string){
    this.openDialog({task:null, type: status})
  }

  private openDialog( taskToOpen ){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = "dialog"
    dialogConfig.data = taskToOpen;

    const dialogRef =  this.dialog.open(AddFormComponent , dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>{
       if (data == undefined)
         return;

       const change = this.info.data.findIndex( task=>task.taskId == data.taskId );
       if( change >-1 ){
         this.info.data[change] = data;
       }
       else{
         this.info.data.push(data);
      }
   })
  }

  deleteTask(event, clickedId: number, ){
    event.stopPropagation();

  }
}

