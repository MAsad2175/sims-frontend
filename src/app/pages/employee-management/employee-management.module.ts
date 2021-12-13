import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeesListingComponent } from './employees-listing/employees-listing.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeManagementServiceService} from '../../services/employee-management-service.service';
import {ConfigurationServiceService} from '../../services/configuration-service.service';
import { LayoutComponent } from './layout/layout.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { QualificationInformationComponent } from './qualification-information/qualification-information.component';
import { ProfessionalInformationComponent } from './professional-information/professional-information.component';

@NgModule({
    declarations: [EmployeesListingComponent, LayoutComponent, BasicInformationComponent, QualificationInformationComponent, ProfessionalInformationComponent],
    imports: [
        CommonModule,
        EmployeeManagementRoutingModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        FormsModule
    ],
    providers: [
        EmployeeManagementServiceService,
        ConfigurationServiceService,
    ]
})
export class EmployeeManagementModule { }
