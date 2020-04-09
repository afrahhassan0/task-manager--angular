import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../../dashboard/group.service';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export interface Step{
  label:string;
  fields: FormlyFieldConfig[];
}


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  public loading = false;

  constructor(
    private dialogRef: MatDialogRef<GroupFormComponent>,
    private groupService:GroupService
  ) {
  }

  public activeStep = 0;
  public model = {
    title: '',
    description: '',
  };
  public steps: Step[] =[
    {
      label: "Group Information",
      fields: [
        {
          key: 'title',
          type:'input',
          templateOptions:{
            type:'text',
            required:true,
            label: "Board Title",
            placeholder: "eg. Task Manager Project Board"
          }
        },
        {
          key: 'description',
          type:'textarea',
          templateOptions:{
            type:'textarea',
            label:"Desciption"
          }
        }
      ]
    },
    {
      label:"Members",
      fields: [
        {
          key:'members',
          type:'select',
          templateOptions: {
            label: 'Members',
            description: 'Choose who will be a member of your group',
            multiple: true,
            selectAllOption: 'Select All',
            options: this.getMembers(),
            valueProp: 'username',
            labelProp: 'fullName'

          }
        }
      ]
    }
  ]

  private getMembers():Observable<any>{
    return  this.groupService.getColleagues();
  }

  public form = new FormArray(this.steps.map( () => new FormGroup({})));
  public options = this.steps.map(() => <FormlyFormOptions> {});

  createGroup(){
    if(this.form.valid){

    }
  }

  submit() {
    alert(JSON.stringify(this.model));
  }

  closeDialog(){
    this.dialogRef.close();
  }


  ngOnInit(): void {
    setTimeout( ()=> this.model.title = "hello", 2000 )
  }



}
