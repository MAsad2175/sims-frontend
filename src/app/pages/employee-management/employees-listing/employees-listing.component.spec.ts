import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListingComponent } from './employees-listing.component';

describe('EmployeesListingComponent', () => {
  let component: EmployeesListingComponent;
  let fixture: ComponentFixture<EmployeesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
