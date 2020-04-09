import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGrpComponent } from './button-grp.component';

describe('ButtonGrpComponent', () => {
  let component: ButtonGrpComponent;
  let fixture: ComponentFixture<ButtonGrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
