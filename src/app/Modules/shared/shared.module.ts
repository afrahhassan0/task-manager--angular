import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { RouterModule } from '@angular/router';
import { AddPersonalFormComponent } from './add-personal-form/add-personal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule, MatTooltip } from '@angular/material/tooltip'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { FormlyMaterialModule } from '@ngx-formly/material'
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BriefPipe } from './brief-pipe';
import { FormListFieldComponent } from './form-list-field/form-list-field.component.type';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupFormComponent } from './group-form/group-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AddSharedFormComponent} from './add-shared-form/add-shared-form.component';
import {NgxPermissionsModule} from 'ngx-permissions';


@NgModule({
  declarations: [ AddPersonalFormComponent, SectionComponent, BriefPipe, FormListFieldComponent, GroupFormComponent , AddSharedFormComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forChild(),
        FormlyMaterialModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatProgressBarModule,
        FormlyMatDatepickerModule,
        DragDropModule,
        FormlyMatDatepickerModule,
        MatNativeDateModule,
        NgxPermissionsModule,
    ],
  exports:[AddPersonalFormComponent, SectionComponent, BriefPipe, AddSharedFormComponent]
})
export class SharedModule { }
