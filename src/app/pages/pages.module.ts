import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { PagesRoutingModule } from './pages-routing.module';
import {PayrollServiceService} from '../services/payroll-service.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgApexchartsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [PayrollServiceService]
})
export class PagesModule { }
