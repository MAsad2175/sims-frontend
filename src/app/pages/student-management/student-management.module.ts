import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentManagementRoutingModule } from './student-management-routing.module';
import { AddStudentComponent } from './Worklist/add-student/add-student.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AcademicService} from '../../services/academic.service';
import {ConfigurationServiceService} from '../../services/configuration-service.service';
import {StudentServiceService} from '../../services/student-service.service';
import {StudentListingComponent} from './Worklist/student-listing/student-listing.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AddStudentComponent, StudentListingComponent],
    imports: [
        CommonModule,
        StudentManagementRoutingModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        FormsModule
    ],
    providers: [AcademicService, ConfigurationServiceService, StudentServiceService]
})
export class StudentManagementModule { }
