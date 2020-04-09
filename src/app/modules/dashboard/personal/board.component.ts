import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/Models/Status';
import {  ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFormComponent } from '../../shared/add-form/add-form.component';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/Models/Task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-personal',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit  {

  public myTasks: Task[] =[];

  constructor(
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private taskService: TaskService,
     ){
    const data = this.currentRoute.snapshot.data['tasks'];
    this.myTasks = data.tasks;
    this.myTasks.forEach( task => {
      switch(task.status){
        case Status.Open:
          this.sectionInfo[0].data.push(task);
        break;
        case Status.Doing:
          this.sectionInfo[1].data.push(task);
        break;
        case Status.Done:
          this.sectionInfo[2].data.push(task);
        break;
      }
    })
  }

  ngOnInit(){

  }

  public sectionInfo=[
    { title: "Open", color:"#ffa294", data: [] },
    { title: "Doing", color:"#5a35ff", data: []},
    { title: "Done", color:"#866bff", data: [] }
  ]

  public sectionDragDrop = [
    { id: "open-section", connectedTo: ["doing-section", "done-section"] },
    { id: "doing-section", connectedTo: ["open-section", "done-section"] },
    { id: "done-section", connectedTo: ["open-section", "doing-section"] }
  ]


   public deleteTask(id){
     const index = this.myTasks.findIndex( task=> task.taskId == id);
     const task = this.myTasks[index];
     this.myTasks.splice(index , 1);
     this.myTasks = [...this.myTasks]
     this.taskService.deletePersonalTask(id).subscribe((res)=>{

     }, err=>{
      console.log(err);
      this.toastr.error("Try again", "Something went wrong");
     })
   }


   public drop( event: CdkDragDrop<any> ){
    if (event.previousContainer != event.container) {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
   }
}
