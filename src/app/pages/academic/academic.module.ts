import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRoutingModule } from './academic-routing.module';
import { ClassComponent } from './Configurations/class/class.component';
import { SectionComponent } from './Configurations/section/section.component';
import { SubjectComponent } from './Configurations/subject/subject.component';
import { SubjectAllocationComponent } from './Worklist/subject-allocation/subject-allocation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AcademicService} from '../../services/academic.service';
import { AssignSubjectComponent } from './Configurations/assign-subject/assign-subject.component';

@NgModule({
  declarations: [ClassComponent, SectionComponent, SubjectComponent, SubjectAllocationComponent, AssignSubjectComponent],
    imports: [
        CommonModule,
        AcademicRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule
    ],
    providers: [AcademicService]
})
export class AcademicModule { }
