import { Component, OnInit, Inject } from '@angular/core';
import { PersonalTaskService } from '../../../Services/personal.task.service';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Task } from 'src/app/Models/Task';
import {BaseAddFormComponent} from '../base.add.form.component';
import {UserService} from '../../../Services/user.service';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-add-personal-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddPersonalFormComponent extends BaseAddFormComponent implements OnInit {

  /*
    receives null as data => opens blank form and sends post request
    receives existing data => populates form and sends put request
  */

  constructor(
    private taskService: PersonalTaskService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AddPersonalFormComponent>,
    protected userService: UserService,
    private toastr: ToastrService) {
    super(data, userService);
  }

  ngOnInit(): void {
    if (this.taskToFetch == null) {
      //nothing to wait for to load, update the status depending on what user clicked
      this.isLoading = false;
      switch (this.type) {
        case "Open":
          this.model.status = 0;
          break;
        case "Doing":
          this.model.status = 1;
          break;
        case "Done":
          this.model.status = 3;
      }
    }
  }

  createTask(): void {
    this.taskService.post(this.formatInput())
      .subscribe((data) => {
        this.toastr.success("", "Successfully saved!");
        this.dialogRef.close(data);
      }, err => {
        this.isLoading = false;
        this.toastr.error("Close or try again later", "Couldn't save!");
      })
  }

  updateTask(): void {
    const updated: Task = this.formatInput();
    this.taskService.put(this.taskToFetch.taskId, this.formatInput())
      .subscribe(() => {
        this.toastr.success("", "Successfully saved!");
        this.dialogRef.close(updated);
      }, err => {
        this.isLoading = false;
        this.toastr.error("Close or try again later", "Couldn't save!");
      })
  }

  public close() {
    if (this.form.touched) {
      this.toastr.info("", "Changes not saved", {timeOut: 2000})
    }
    this.dialogRef.close();
  }
}
