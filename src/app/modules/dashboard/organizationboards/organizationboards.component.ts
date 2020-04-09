import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/Models/Group';
import { GroupService } from '../group.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GroupFormComponent } from '../../shared/group-form/group-form.component';


@Component({
  selector: 'app-organizationboards',
  templateUrl: './organizationboards.component.html',
  styleUrls: ['./organizationboards.component.css']
})
export class OrganizationboardsComponent implements OnInit {
  public groups: Group[]= [];
  public colleagues = [];

  constructor(
    private groupService: GroupService,
    private toastr: ToastrService,
    private router:Router,
    private dialog: MatDialog,
  ){ }

  ngOnInit(): void {
      this.groupService.getGroups()
       .subscribe( res =>{
      this.groups = res["groups"];
      console.log(res)
    }, err => {
      if(err.status == 401) {
        localStorage.removeItem("Authentication");
        localStorage.removeItem("userInfo");
        this.router.navigate(['welcome/login']);
      }
    })
  }

  public addBoard(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = "dialog";

    dialogConfig.data = this.colleagues;

    const dialogRef = this.dialog.open( GroupFormComponent , dialogConfig);

    dialogRef.afterClosed().subscribe(()=>{
      //refresh content in case user exsited before completing all his changes
      this.ngOnInit();
    })
  }

  public deleteGroup(){

  }

}
