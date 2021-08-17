import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { BankComponent } from './bank/bank.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { SalutationComponent } from './salutation/salutation.component';
import { GenderComponent } from './gender/gender.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { LeaveTypesComponent } from './leave-types/leave-types.component';
import { LeavePolicyComponent } from './leave-policy/leave-policy.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';
import {ConfigurationServiceService} from '../../services/configuration-service.service';
import { SalaryModelComponent } from './salary-model/salary-model.component';

@NgModule({
    declarations: [BankComponent, SalutationComponent, GenderComponent, BloodGroupComponent, LeaveTypesComponent, LeavePolicyComponent, UserRoleComponent, DesignationComponent, DepartmentComponent, SalaryModelComponent],
    imports: [
        CommonModule,
        ConfigurationsRoutingModule,
        NgbPaginationModule,
        ReactiveFormsModule,
    ],
    providers: [
        ConfigurationServiceService
    ]
})
export class ConfigurationsModule { }
