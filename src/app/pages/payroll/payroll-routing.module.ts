import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllowanceDeductionComponent} from './Configurations/allowance-deduction/allowance-deduction.component';
import {EmployeeDetailsComponent} from './Worklist/employee-details/employee-details.component';
import {LayoutComponent} from './Worklist/layout/layout.component';

const routes: Routes = [
  {path: 'allowance-deduction', component: AllowanceDeductionComponent},
  {path: 'employee-details', component: EmployeeDetailsComponent},
  {path: 'details', component: LayoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
