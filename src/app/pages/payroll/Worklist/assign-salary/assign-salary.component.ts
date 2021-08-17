import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeManagementServiceService} from '../../../../services/employee-management-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../../services/configuration-service.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AcademicService} from '../../../../services/academic.service';
import {PayrollServiceService} from "../../../../services/payroll-service.service";

declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-assign-salary',
  templateUrl: './assign-salary.component.html',
  styleUrls: ['./assign-salary.component.scss']
})
export class AssignSalaryComponent implements OnInit {
  assignPayrollSalary: FormGroup;
  employeeId: any;
  classList: any;
  employeeDetails: any;
  salaryModels: any;
  salaryType: any;
  salaryOnPayroll: any;
  isPayrollAdd = false;

  constructor( private route: ActivatedRoute,
               private employeeService: EmployeeManagementServiceService,
               private academicService: AcademicService,
               private payrollService: PayrollServiceService,
               private fb: FormBuilder,
               private ngxLoader: NgxUiLoaderService,
               private configurationService: ConfigurationServiceService) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = Number(params.id);
      if ( this.employeeId ) {
        this.getBasicInformationById();
      }
    });
  }
  getClassDetails(): any {
    this.academicService.classListing('', '', '', true).subscribe(data => {
      this.classList = data;
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  getSalaryModel(): any {
    this.configurationService.salaryModelListing('', '', '', true).subscribe(data => {
      this.salaryModels = data;
      this.salaryType = this.salaryModels.filter( t => t.id === this.employeeDetails.salary_model );
      if ( this.salaryType[0].is_commission === false ) {
        this.salaryOnPayroll = true;
        this.assignPayrollSalary.get('is_commission').setValue(false);
      } else {
        this.salaryOnPayroll = false;
        this.assignPayrollSalary.get('is_commission').setValue(true);
      }
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  getBasicInformationById(): any {
    this.ngxLoader.start();
    this.employeeService.submitTeacherBasicInformationById(this.employeeId).subscribe(data => {
      this.employeeDetails = data;
      this.getSalaryModel();
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  submitPayrollSalary(): any {
    console.log('this.assignPayrollSalary.value', this.assignPayrollSalary.value);
    this.isPayrollAdd = true;
    if (this.assignPayrollSalary.invalid) {
      return;
    }
    this.ngxLoader.start();
    this.payrollService.submitAssignSalary(this.assignPayrollSalary.value).subscribe(data => {
      this.isPayrollAdd = false;
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  createCommisionSalaryList(): any {
    return this.fb.group({
      class: ['', Validators.required],
      salary_type: [0, Validators.required],
      amount: [0, Validators.required],
    });
  }
  get controlsSalary(): any {
    return ( this.assignPayrollSalary.get('list') as FormArray );
  }
  addMoreClasses(): any {
    this.controlsSalary.push(this.createCommisionSalaryList());
  }
  removeClasses(index): any {
    this.controlsSalary.removeAt(index);
  }
  ngOnInit() {
    this.getClassDetails();
    this.assignPayrollSalary = this.fb.group({
      amount: [0, Validators.required],
      is_commission: [],
      id: this.employeeId,
      list: this.fb.array([this.createCommisionSalaryList()]),
    });
  }

}
