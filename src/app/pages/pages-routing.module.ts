import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'configuration', loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsModule)},
  { path: 'employee', loadChildren: () => import('./employee-management/employee-management.module').then(m => m.EmployeeManagementModule)},
  { path: 'academic', loadChildren: () => import('./academic/academic.module').then(m => m.AcademicModule)},
  // { path: 'payroll', loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollModule)},
  { path: 'student', loadChildren: () => import('./student-management/student-management.module').then(m => m.StudentManagementModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
