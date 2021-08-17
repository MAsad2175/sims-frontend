import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassComponent} from './Configurations/class/class.component';
import {SectionComponent} from './Configurations/section/section.component';
import {SubjectComponent} from './Configurations/subject/subject.component';
import {AssignSubjectComponent} from './Configurations/assign-subject/assign-subject.component';

const routes: Routes = [
  {path: 'class', component: ClassComponent},
  {path: 'section', component: SectionComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'assign-subject', component: AssignSubjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
