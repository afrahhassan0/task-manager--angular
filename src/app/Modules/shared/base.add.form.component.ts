import {Component, Inject, OnInit} from '@angular/core';
import { Task } from 'src/app/Models/Task';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {UserService} from '../../Services/user.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {count} from 'rxjs/operators';

@Component({
  template:''
})
export abstract class BaseAddFormComponent {
  public taskToFetch: Task;
  public type: string;
  public isLoading:boolean = true;

  private route = -1;

  abstract createTask():void;
  abstract updateTask():void;

  protected constructor(
    @Inject(MAT_DIALOG_DATA) data,
    protected userService: UserService
  ) {
    this.taskToFetch = data.task;
    if(this.taskToFetch!=null){
      this.isLoading = false;
      this.model.title = this.taskToFetch.title;
      this.model.deadline = new Date(this.taskToFetch.deadline);
      this.model.description = this.taskToFetch.description;
      this.model.status = this.taskToFetch.status;
    }else this.type = data.type;
    this.route = this.url();
  }

  protected url():number{
    const url = window.location.href.split( '/' );
    const group = parseInt( url[ url.length -1 ] );
    return  ( isNaN(group) )? -1 : group;
  }

  protected formatInput(): Task{
    let insertedTask: Task = new Task(
      (this.taskToFetch!=null)? this.taskToFetch.taskId: -1,  //if -1 (post request),it wont make a difference
      this.model.title,
      this.formatDate(),
      this.model.status,
      (this.model.checklists[0].Title == "")? null: this.model.checklists,
      (this.model.description == "")? null: this.model.description,
    );
    return insertedTask;
  }

  protected formatDate():string{
    const formattedDate = new Date(this.model.deadline);
    console.log(this.model.deadline);
    return formattedDate.getMonth()+"/" + formattedDate.getUTCDate()+"/" + formattedDate.getUTCFullYear();
  }

  public save() {
    if (this.form.valid){
      this.isLoading = true;
      //was the dialog opened to add or to update the task
      (this.taskToFetch == null) ? this.createTask() : this.updateTask();
    }
  }

  public form = new FormGroup({});
  public model= {
    title:'',
    deadline: new Date("01/01/2020"),
    status: 0,
    description:'',
    checklists:[{
      isChecked: false,
      Title: ""
    }],
    adminComments:[],
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type:'input',
      templateOptions: {
        label: 'Title',
        required: true,
        maxLength: 50,
        placeholder:'eg. Start building UI',
      }
    },
    {
      key: 'status',
      type:'select',
      templateOptions:{
        label: 'Status',
        options: [
          { value: 0 , label:'Open' },
          { value: 1, label: 'Doing, in progress'} ,
          { value: 3, label: 'Done' }
        ],
        required: true,
      },
      hideExpression: this.route == -1
    },
    {
      key: 'status',
      type:'select',
      templateOptions:{
        label: 'Status',
        options: [
          { value: 0 , label:'Open' },
          { value: 1, label: 'Doing, in progress'} ,
          { value: 2, label: 'Reviewing' },
          { value: 3, label: 'Done' },
        ],
        required: true,
      },
      hideExpression: this.route != -1
    },
    {
      key: 'deadline',
      type:'datepicker',
      templateOptions:{
        label: 'Deadline',
        placeholder: 'eg. 02/29/2020',
        required: true
      }
    },
    {
      key:'checklist',
      type:'checklist',
      templateOptions:{
        addText: 'Add a to-do to the checklist',
      },
      fieldArray:{
        fieldGroup:[
          {
            type: 'checkbox',
            key: 'isChecked',
          },
          {
            type: 'input',
            key:'Title',
            templateOptions:{
              placeholder: 'eg. Draw wireframe',
              maxLength: 50,
              required: true
            }
          }
        ]
      }
    },
    {
      key:'description',
      type:'textarea',
      templateOptions:{
        maxLength: 200,
        label:'Description'
      }

    }

  ];
}
