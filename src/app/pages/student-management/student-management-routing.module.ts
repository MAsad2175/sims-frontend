import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddStudentComponent} from './Worklist/add-student/add-student.component';
import {StudentListingComponent} from './Worklist/student-listing/student-listing.component';

const routes: Routes = [
  {path: 'add', component: AddStudentComponent},
  {path: '', component: StudentListingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentManagementRoutingModule { }
