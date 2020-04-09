import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationboardsComponent } from './organizationboards.component';

describe('OrganizationboardsComponent', () => {
  let component: OrganizationboardsComponent;
  let fixture: ComponentFixture<OrganizationboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
