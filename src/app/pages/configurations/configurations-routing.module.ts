import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BankComponent} from './bank/bank.component';
import {SalutationComponent} from './salutation/salutation.component';
import {GenderComponent} from './gender/gender.component';
import {BloodGroupComponent} from './blood-group/blood-group.component';
import {LeaveTypesComponent} from './leave-types/leave-types.component';
import {LeavePolicyComponent} from './leave-policy/leave-policy.component';
import {UserRoleComponent} from './user-role/user-role.component';
import {DesignationComponent} from './designation/designation.component';
import {DepartmentComponent} from './department/department.component';
import {SalaryModelComponent} from './salary-model/salary-model.component';
import {ReligionComponent} from './religion/religion.component';

const routes: Routes = [
  { path: 'bank', component: BankComponent },
  { path: 'salutation', component: SalutationComponent },
  { path: 'gender', component: GenderComponent },
  { path: 'blood-group', component: BloodGroupComponent },
  { path: 'user-type', component: UserRoleComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'salary-model', component: SalaryModelComponent },
  { path: 'religion', component: ReligionComponent },
  // { path: 'leave-type', component: LeaveTypesComponent },
  // { path: 'leave-policy', component: LeavePolicyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
