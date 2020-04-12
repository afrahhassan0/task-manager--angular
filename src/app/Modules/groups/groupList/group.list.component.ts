import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/Models/Group';
import { GroupService } from '../../../Services/group.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { GroupFormComponent } from '../../shared/group-form/group-form.component';
import {NgxPermissionsService} from 'ngx-permissions';
import {UserService} from '../../../Services/user.service';


@Component({
  selector: 'app-organizationboards',
  templateUrl: './group.list.component.html',
  styleUrls: ['./group.list.component.css']
})
export class GroupListComponent implements OnInit {
  public groups: Group[]= [];
  public colleagues = [];
  private url: string[];

  constructor(
    private groupService: GroupService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router,
    private dialog: MatDialog,
    private permission: NgxPermissionsService,
    private userService: UserService
  ){
    this.url = window.location.href.split("/");
    this.setPermisson();
  }

  private setPermisson(){
    if( this.url.includes( "org" ) )
      this.permission.loadPermissions( ['MEMBER'] );
    else this.permission.loadPermissions( ['ADMIN'] )
  }

  ngOnInit(): void {
      this.groupService.getGroups()
       .subscribe( res =>{
         const groups:Group[] = res["groups"];
         const username = this.userService.getUsername();
         this.groups =  ( this.url.includes("org") )?
           groups.filter( g => g.adminUsername == username ) : groups;
       }, err => {
      if(err.status == 401) {
        localStorage.removeItem("Authentication");
        localStorage.removeItem("userInfo");
        this.router.navigate(['welcome/login']);
      }
    });
  }

  public deleteGroup( event: Event ,groupId:number ){
    event.stopPropagation();
    const index = this.groups.findIndex( g=> g.groupId == groupId );
    const group = this.groups[index];
    this.groups.splice( index, 1 );
    this.groupService.delete(groupId).subscribe(()=>{
      this.toastr.info('', 'Deleted', { timeOut: 1000 });
    }, error => {
      //re-add group into previous position
      this.groups.splice(index , 0 , group);
      this.toastr.error('', 'Could not delete', { timeOut: 2000 });
    })
  }

  public addBoard(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = "dialog";

    dialogConfig.data = this.colleagues;

    const dialogRef = this.dialog.open( GroupFormComponent , dialogConfig );

    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    })
  }


  goToGroup( groupId:number ) {
    this.router.navigate([ './group/'+groupId ] , { relativeTo: this.currentRoute });
  }
}
