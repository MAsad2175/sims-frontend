import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationInformationComponent } from './qualification-information.component';

describe('QualificationInformationComponent', () => {
  let component: QualificationInformationComponent;
  let fixture: ComponentFixture<QualificationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
