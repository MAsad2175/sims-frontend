import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesListingComponent} from './employees-listing/employees-listing.component';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  {path: 'add', component: LayoutComponent},
  {path: 'details', component: EmployeesListingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
