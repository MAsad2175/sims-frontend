import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { AllowanceDeductionComponent } from './Configurations/allowance-deduction/allowance-deduction.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDetailsComponent } from './Worklist/employee-details/employee-details.component';
import {EmployeeManagementServiceService} from '../../services/employee-management-service.service';
import {ConfigurationServiceService} from '../../services/configuration-service.service';
import { LayoutComponent } from './Worklist/layout/layout.component';
import { AssignSalaryComponent } from './Worklist/assign-salary/assign-salary.component';
import { AllowanceComponent } from './Worklist/allowance/allowance.component';
import { DeductionComponent } from './Worklist/deduction/deduction.component';
import {AcademicService} from '../../services/academic.service';

@NgModule({
  declarations: [AllowanceDeductionComponent, EmployeeDetailsComponent, LayoutComponent, AssignSalaryComponent, AllowanceComponent, DeductionComponent],
    imports: [
        CommonModule,
        PayrollRoutingModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        FormsModule
    ],
    providers: [EmployeeManagementServiceService, ConfigurationServiceService, AcademicService ],
})
export class PayrollModule { }
