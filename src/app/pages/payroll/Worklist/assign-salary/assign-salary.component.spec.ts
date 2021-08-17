import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSalaryComponent } from './assign-salary.component';

describe('AssignSalaryComponent', () => {
  let component: AssignSalaryComponent;
  let fixture: ComponentFixture<AssignSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
