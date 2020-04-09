import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { TaskService } from '../../dashboard/task.service';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  public taskToFetch: Task;
  public type: string;
  public isLoading:boolean = true;

  /*
    recives null as data => opens blank form and sends post request
    recives existing data => populates form and sends put request
  */

  constructor(
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AddFormComponent>,
    private toastr: ToastrService) {

      this.taskToFetch = data.task;
      if(this.taskToFetch!=null){
        this.isLoading = false;
        this.model.title = this.taskToFetch.title;
        this.model.deadline = new Date(this.taskToFetch.deadline);
        this.model.description = this.taskToFetch.description;
        this.model.status = this.taskToFetch.status;
      }else this.type = data.type;
    }

  private title ="test";
  ngOnInit(): void {
    if(this.taskToFetch == null){
      //nothing to wait for to load, update the status depending on what user clicked
      this.isLoading = false;
      switch (this.type){
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

  public save(){
    if( this.form.invalid ){
      this.toastr.warning("Requirments are missing!", "Cannot save")
    }else{
      this.isLoading = true;
      //was the dialog opened to add or to update the task
      ( this.taskToFetch == null )? this.createTask() : this.updateTask();
    }
  }

  private createTask():void{
    this.taskService.createAPrivateTask(this.formatInput())
        .subscribe( (data) => {
          this.toastr.success("", "Successfully saved!");
          this.dialogRef.close(data);
        } , err=>{
          this.isLoading= false;
          this.toastr.error("Close or try again later", "Couldn't save!");
        })
  }

  private updateTask():void{
    const updated:Task = this.formatInput();
    this.taskService.updateTask(this.taskToFetch.taskId , this.formatInput())
    .subscribe( () => {
      this.toastr.success("", "Successfully saved!");
      this.dialogRef.close(updated);
    } , err=>{
      this.isLoading= false;
      this.toastr.error("Close or try again later", "Couldn't save!");
    })
  }

  public close(){
    if( this.form.touched ){
      this.toastr.info("","Changes not saved", { timeOut:2000 })
    }
     this.dialogRef.close();
  }

  private formatInput(): Task{
    let insertedTask: Task = new Task(
      (this.taskToFetch!=null)? this.taskToFetch.taskId: -1,  //if -1 (post request),it wont make a difference
      this.model.title,
      this.formatDate(),
      this.model.status,
      (this.model.checklists[0].Title == "")? null: this.model.checklists,
      (this.model.description == "")? null: this.model.description
    );
    return insertedTask;

  }


  private formatDate():string{
    const formattedDate = new Date(this.model.deadline)
    console.log(this.model.deadline)
    return formattedDate.getMonth()+"/" + formattedDate.getUTCDate()+"/" + formattedDate.getUTCFullYear();

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
     }]
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
          { value: 1, label: 'Doing, in progress'},
          { value: 3, label: 'Done' }
        ],
        required: true,
      }
    },
    {
      key: 'createdDate',
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
