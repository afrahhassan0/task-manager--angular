import {Component} from '@angular/core';
import {Task} from '../../Models/Task';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  template:''
})
export abstract class BaseDashboardComponent {
  public tasks: Task[] = [];

  protected constructor(
     protected toastr: ToastrService,
     protected dialog: MatDialog,
   ) { }

   abstract deleteTask( taskId:number );
   abstract filterSections();

  public openDialog( taskToOpen, componentName ){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = "dialog"
    dialogConfig.data = taskToOpen;

    const dialogRef =  this.dialog.open(componentName , dialogConfig);

    dialogRef.afterClosed().subscribe(
      data =>{
        if (data == undefined)
          return;
        const change = this.tasks.findIndex( task=>task.taskId == data.taskId );
        if( change >-1 ){
          this.tasks[change] = data;
        }
        else{
          this.tasks.push(data);
        }
        this.filterSections();
      })
  }

  public moveItems( event: CdkDragDrop<any> ){
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
  }
}
