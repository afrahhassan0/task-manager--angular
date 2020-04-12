import {Component, Inject, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Task } from 'src/app/Models/Task';
import {BaseAddFormComponent} from '../base.add.form.component';
import {UserService} from '../../../Services/user.service';
import {SharedTaskService} from '../../../Services/shared-task.service';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-add-shared-form',
  template: `
    <mat-progress-bar mode="indeterminate" *ngIf="isLoading == true" ></mat-progress-bar>
    <div class="modal-form-container">
      <mat-dialog-content [formGroup]="form">
        <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button type="submit" mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Save</button>
        <button mat-raised-button (click)="close()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./add-shared-form.component.css']
})
export class AddSharedFormComponent extends BaseAddFormComponent implements OnInit {
  public groupId: number;

  constructor(
    private sharedTaskService: SharedTaskService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AddSharedFormComponent>,
    protected userService: UserService,
    private toastr: ToastrService) {
    super(data, userService);
    this.groupId = this.url();
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
        case "Reviewing":
          this.model.status = 2;
          break;
        case "Done":
          this.model.status = 3;
      }
    }
  }

  createTask(): void {
    this.sharedTaskService.post( this.formatInput(), this.groupId ).subscribe( (res) => {
      this.toastr.success("", "Successfully saved!");
      this.dialogRef.close(res);
    }, err => {
      this.isLoading = false;
      this.toastr.error("Close or try again later", "Couldn't save!");
    })
  }

  updateTask(): void {
    const updated: Task = this.formatInput();
    this.sharedTaskService.put(this.taskToFetch.taskId, this.formatInput(), this.groupId)
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
      this.toastr.info("", "Changes not saved", {timeOut: 2000});
    }
    this.dialogRef.close();
  }
}
