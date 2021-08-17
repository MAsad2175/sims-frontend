import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryModelComponent } from './salary-model.component';

describe('SalaryModelComponent', () => {
  let component: SalaryModelComponent;
  let fixture: ComponentFixture<SalaryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
