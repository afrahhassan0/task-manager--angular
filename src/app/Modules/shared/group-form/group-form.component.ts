import { Component, OnInit  } from '@angular/core';
import { GroupService } from '../../../Services/group.service';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import {MembershipService} from '../../../Services/membership.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../Models/Group';
import {ToastrService} from 'ngx-toastr';

export interface Step {
  label:string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent {
  public loading = false;
  private addedGroup:Group;

  constructor(
    private dialogRef: MatDialogRef<GroupFormComponent>,
    private groupService:GroupService,
    private membershipService: MembershipService,
    private toastr: ToastrService
  ) {
  }

  public activeStep = 0;
  public model = {
    title: '',
    description: '',
    members:[]
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
  ];

  private getMembers():Observable<any>{
    return  this.membershipService.getColleagues();
  }

  public form = new FormArray(this.steps.map( () => new FormGroup({})));
  public options = this.steps.map(() => <FormlyFormOptions> {});

  createGroup(){
    if(this.form.valid){
      this.groupService.post({ title: this.model.title,description: this.model.description }).subscribe( (res: Group) =>{
        this.addedGroup = res;
        this.activeStep ++;
      }, err => {
        this.toastr.error('Could not save', 'An error occurred');
        this.dialogRef.close();
      })
    }
  }

  submit() {
    if( this.model.members.length >0 ) {
      this.membershipService.postAll( this.addedGroup.groupId , this.model.members ).subscribe( ()=> this.dialogRef.close(this.addedGroup) );
    }else this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }


}
