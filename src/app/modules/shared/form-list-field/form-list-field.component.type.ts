import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
@Component({
  selector: 'app-form-list-field',
  template: `
    <div class="list-container">
      <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <formly-field class="col" [field]="field"></formly-field>
      <div class="buttons">
        <button mat-stroked-button color="primary" (click)="add()">Add</button>
        <button mat-stroked-button color="warn" (click)="remove(i)">Add</button>
      </div>
      </div>
    </div>
  `,
  styleUrls: ['./form-list-field.component.css']
})
export class FormListFieldComponent extends FieldArrayType implements OnInit {

  constructor() { super() }

  ngOnInit(): void {
  }

}
