import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Models/UserLogin';
import { UserService } from 'src/app/Services/user.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, Form } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  template:`
    <form [formGroup]="form">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      <div style="display: flex; align-items: flex-end;">
        <button type="submit" (click)="onSubmit()" mat-raised-button [disabled]="form.invalid" color="primary">Login</button>
      </div>
    </form>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public model:UserLogin;
    public fields: FormlyFieldConfig[];

  constructor( private apiService: UserService, private routeTo: Router, private toastr: ToastrService ) {

  }
  onSubmit() {
    if ( this.form.invalid) {
      this.toastr.warning("Complete the form please", "Form Incomplete!" , {positionClass: 'toast-top-left'})
    } else {
      this.model.Username = this.model.Username.trim();
      this.apiService.login(this.model).pipe(
        tap(res => localStorage.setItem("Authentication", res.headers.get("Authentication")))
      ).pipe(
        tap(res=> {
          const toStore ={
            email: this.model.Email,
            username: this.model.Username,
            organizationName: res.body.credentials.organizationName,
            role: res.body.role
          };

          localStorage.setItem("userInfo" , JSON.stringify(toStore));
        })
      ).subscribe( (res)=>{
          this.toastr.success("Loading your tasks.." , "Welcome Back", {positionClass: 'toast-top-left' })
          this.routeTo.navigate( ['/dashboard']);
      } , (err)=>{
        console.log(err);
        this.toastr.error(err.error , "Error!", { positionClass:'toast-top-left' })
      })
    }

  }

  ngOnInit(): void {

    this.form = new FormGroup({});
    this.model = { Email: '' , Username:'', Password:''};
    this.fields = [
      {
        key: 'Username',
        type:'input',
        templateOptions:{
          label: 'Username',
          placeholder:'Your Username',
          required: true,
        }
      },
      {
        key: 'Email',
        type: 'input',
        templateOptions: {
          label: 'Email address',
          type:'email',
          placeholder: 'Enter email',
          required: true,
        },
      },
      {
        key: 'Password',
        type: 'input',
        templateOptions:{
          label: 'Password',
          type:'password',
          placeholder: 'Your Password',
          required: true
        }
      }
    ];
  }

}
