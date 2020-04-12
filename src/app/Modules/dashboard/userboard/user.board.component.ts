import {Component, OnInit} from '@angular/core';
import {Status} from 'src/app/Models/Status';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddPersonalFormComponent} from '../../shared/add-personal-form/add-personal-form.component';
import {PersonalTaskService} from '../../../Services/personal.task.service';
import {ToastrService} from 'ngx-toastr';
import {BaseDashboardComponent} from '../../shared/base.dashboard.component';
import {NgxPermissionsService} from 'ngx-permissions';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Task} from '../../../Models/Task';

@Component({
  selector: 'app-personal',
  templateUrl: './user.board.component.html',
  styleUrls: ['./user.board.component.css']
})
export class UserBoardComponent extends BaseDashboardComponent implements OnInit{
  constructor(
    private currentRoute: ActivatedRoute,
    protected toastr: ToastrService,
    private taskService: PersonalTaskService,
    protected dialog: MatDialog,
    private permission: NgxPermissionsService
     ){
    super( toastr, dialog );
    const data = this.currentRoute.snapshot.data['tasks'];
    this.tasks = data.tasks;
    this.filterSections();
  }

  ngOnInit(): void {
    this.permission.loadPermissions( [ 'MEMBER' , 'ADMIN' ] );
  }

  filterSections(){
    this.sectionInfo.forEach( section => section.data =[] );
    this.tasks.forEach( task => {
      switch(task.status){
        case Status.Open:
          this.sectionInfo[0].data = [...this.sectionInfo[0].data, task];
          break;
        case Status.Doing:
          this.sectionInfo[1].data = [...this.sectionInfo[1].data, task];
          break;
        case Status.Done:
          this.sectionInfo[2].data = [...this.sectionInfo[2].data, task];
          break;
      }
    })
  }

  public sectionInfo=[
    { title: "Open", color:"#ffa294", data: [] },
    { title: "Doing", color:"#5a35ff", data: []},
    { title: "Done", color:"#866bff", data: [] }
  ];

  public sectionDragDrop = [
    { id: "Open", connectedTo: ["Doing", "Done"] },
    { id: "Doing", connectedTo: ["Open", "Done"] },
    { id: "Done", connectedTo: ["Open", "Doing"] }
  ];

   public deleteTask(id){
     this.taskService.delete(id).subscribe((res)=>{}, err=>{
      this.toastr.error("Try again", "Something went wrong");
     })
   }

   public triggerDialog(event){
     this.openDialog( event, AddPersonalFormComponent );
   }

   public drop( event:  CdkDragDrop<any> ){
     if (event.previousContainer != event.container) {
       super.moveItems( event );
       //find affected task:
       const task: Task = event.container.data[event.currentIndex];
       //change its status accordingly (sections are in order that's why index == enum number)
       task.status = this.sectionInfo.findIndex(info => info.title == event.container.id);
       this.taskService.put( task.taskId, task ).subscribe();
     }
   }

}
