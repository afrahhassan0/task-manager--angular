import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedTaskService} from '../../../Services/shared-task.service';
import {Status} from '../../../Models/Status';
import {Group} from '../../../Models/Group';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {BaseDashboardComponent} from '../../shared/base.dashboard.component';
import {AddSharedFormComponent} from '../../shared/add-shared-form/add-shared-form.component';
import {MembershipService} from '../../../Services/membership.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {Task} from '../../../Models/Task';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent extends BaseDashboardComponent implements OnInit{
  public group: Group;
  public members = [];
  private permission;
  public disableDrag: boolean;

  constructor(
    private currentRoute: ActivatedRoute,
    private sharedTask: SharedTaskService,
    private membershipService: MembershipService,
    protected toastr: ToastrService,
    protected dialog: MatDialog,
    private permissionsService: NgxPermissionsService,
    ) {
    super( toastr, dialog );
    const data = this.currentRoute.snapshot.data["tasks"];
    this.permission = this.currentRoute.snapshot.data["perm"];
    this.setPermissions();
    this.tasks = data.tasks;
    this.filterSections();
    this.group = data.belongsTo;
  }

  private setPermissions(){
    this.permissionsService.loadPermissions( [this.permission.role] );
    this.disableDrag =  this.permission.role != 'ADMIN';
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
        case Status.Reviewing:
          this.sectionInfo[1].data = [...this.sectionInfo[2].data, task];
          break;
        case Status.Done:
          this.sectionInfo[2].data = [...this.sectionInfo[3].data, task];
          break;
      }
    })
  }
  public sectionInfo=[
    { title: "Open", color:"#ffa294", data: [] },
    { title: "Doing", color:"#5a35ff", data: []},
    { title: "Reviewing", color:"#933fff", data: []},
    { title: "Done", color:"#866bff", data: [] }
  ];

  public sectionDragDrop = [
    { id: "open", connectedTo: ["doing", "done", "reviewing"] },
    { id: "doing", connectedTo: ["open", "done", "reviewing"] },
    { id: "reviewing", connectedTo: ["open", "done", "doing"] },
    { id: "done", connectedTo: ["open", "doing", "reviewing"] }
  ];


  ngOnInit(): void {
      this.membershipService.getMembers( this.group.groupId ).subscribe( (members:any[]) => {
        this.members = members
      } )
  }

  public deleteTask(id){
    this.sharedTask.delete(id).subscribe((res)=>{}, err=>{
      this.toastr.error("Try again", "Something went wrong");
    })
  }

  public drop( event:  CdkDragDrop<any> ){
    if (event.previousContainer != event.container) {
      super.moveItems( event );
      const task: Task = event.previousContainer.data[ event.previousIndex ];
      task.status = this.sectionInfo.findIndex(info => info.title == event.container.id);
      this.sharedTask.put( task.taskId, task , this.group.groupId ).subscribe();
    }
  }

  public triggerDialog(event){
    this.openDialog( event, AddSharedFormComponent );
  }




}
