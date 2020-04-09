import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcomepage/welcome/welcome.component';
import { LoginComponent } from './welcomepage/login/login.component';
import { SignupComponent } from './welcomepage/signup/signup.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ButtonGrpComponent } from './welcomepage/button-grp/button-grp.component'
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { FormListFieldComponent } from './modules/shared/form-list-field/form-list-field.component.type';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    ButtonGrpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages:[
        { name: 'required', message: validateRequired },
				{ name: 'minlength', message: validateMinLength },
				{ name: 'maxlength', message: validateMaxLength },
      ],
        types:[ { name: 'checklist' , component: FormListFieldComponent } ]

    }
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormlyMaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//angular form;y validation messages
export function validateRequired(err, field: FormlyFieldConfig) {
  return `This field is required`
}

export function validateMinLength(err, field: FormlyFieldConfig) {
	return `${field.templateOptions.label} must have atleast ${field.templateOptions.minLength} characters`
}

export function validateMaxLength(err, field: FormlyFieldConfig) {
	return `${field.templateOptions.label} cannot have more than ${field.templateOptions.minLength} characters`
}
