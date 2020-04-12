import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserLogin } from 'src/app/Models/UserLogin';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSignup } from 'src/app/Models/UserSignup';
import { Role } from 'src/app/Models/Role';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  template:`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      <div style="display: flex; align-items: flex-end;">
        <button type="submit" (click)="onSubmit()" mat-raised-button [disabled]="form.invalid" color="primary">Join Us!</button>
        <button type="reset" mat-stroked-button routerLink="['../login']" style="margin: 0 0 0 10px;">Or Sign in</button>
      </div>
    </form>
  `,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public model:UserSignup;
  public fields: FormlyFieldConfig[]

  constructor(private apiService: UserService, private routeTo: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.model = new UserSignup ( '', '' ,'', '', Role.Member, '', '', 961, '')
    this.fields = [
    {
      key:'fullName',
      type:'input',
      templateOptions:{
        required: true,
        label:'Full Name',
        placeholder:'John Smith',
        maxLength: 20
      }

    },
    {
      key: 'email',
      type:'input',
      templateOptions:{
        type:'text',
        label:'Email',
        placeholder:'Your Email',
        required: true
      }
    },
    {
      key:'username',
      type:'input',
      templateOptions:{
        type:'text',
        placeholder:'Your username',
        required: true,
        label:'Username',
        maxLength: 25,
        description:'Choose a unique username'
      }
    },
    {
      key: 'password',
      type:'input',
      templateOptions:{
        type:'password',
        placeholder:'Your Password',
        required: true,
        label:'Password',
        minLength:8,
        description:'Choose a password of minimum 8 characters length'
      }
    },
    {
      key:'organizationName',
      type:'input',
      templateOptions:{
        type:'text',
        placeholder:'Organization',
        required: true,
        label:'Organization',
        description:'Be part of groups with people from your organization'
      }
    },
    {
      key:'role',
      type:'select',
      templateOptions:{
        required: true,
        options: [
          { value: 0, label:"Admin" },
          { value: 1, label:"Member" }
        ]
      }
    },
    {
      key: 'jobTitle',
      type: 'input',
      hideExpression: ()=>this.model.role == 1,
      templateOptions:{
        label:'Job Position',
        description:'Makes your profile more identifiable',
        placeholder: 'eg. Project Manager',
        required: true
      }
    },
    {
      key:'phoneNumber',
      type: 'input',
      hideExpression:() => this.model.role ==1,
      templateOptions:{
        type: 'number',
        label: "Phone Number",
        placeholder: "+961.."
      }
     }
  ]
  }


  onSubmit(){
    if(this.form.invalid){
      this.toastr.warning("Complete the form please", "Form Incomplete!" , {positionClass: 'toast-top-left'})
    }else{
      this.model.username = this.model.username.trim();
      this.apiService.signup(this.model).pipe(
        tap(res => localStorage.setItem("Authentication", res.headers.get("Authentication")))
      ).pipe(
        tap(res=> {
          console.log(res);
          const toStore ={
            email: this.model.email,
            username: this.model.username,
            organizationName: this.model.organizationName,
            role: this.model.role,

          };

          localStorage.setItem("userInfo" , JSON.stringify(toStore));
        })
      ).subscribe( (res)=>{
          this.toastr.success("" , "Welcome To TaskIt", {positionClass: 'toast-top-left' })
          this.routeTo.navigate( ['/dashboard']);
      } , (err)=>{
        console.log(err);
        this.toastr.error(err.error , "Error!", { positionClass:'toast-top-left' })
      })
    }
  }

}
