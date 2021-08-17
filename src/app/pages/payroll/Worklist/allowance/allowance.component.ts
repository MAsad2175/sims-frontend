import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PayrollServiceService} from '../../../../services/payroll-service.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.scss']
})
export class AllowanceComponent implements OnInit {
  allowanceForm: FormGroup;
  employeeId: any;
  allowanceList: any;
  isAllowanceAdd = false;

  constructor( private route: ActivatedRoute,
               private ngxLoader: NgxUiLoaderService,
               private fb: FormBuilder,
               private payrollService: PayrollServiceService) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = Number(params.id);
      if ( this.employeeId ) {
        this.getAllowanceDeductionList();
      }
    });
  }
  getAllowanceDeductionList(): any {
    this.ngxLoader.start();
    this.payrollService.allowanceDeductionListing('', '', '', true).subscribe(
    data => {
      this.allowanceList = data;
      this.allowanceList = this.allowanceList.filter( t => t.type === 'Allowance');
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  createAllowance(): any {
    return this.fb.group({
      name: ['', Validators.required],
      calculated_fixed: ['', Validators.required],
      amount_percentage: [0, Validators.required],
    });
  }
  patchAllowance(data): any {
    return this.fb.group({
      name: data.name,
      calculated_fixed: data.calculated_fixed,
      amount_percentage: data.amount_percentage,
    });
  }
  get controlsAllowance(): any {
    return ( this.allowanceForm.get('list') as FormArray );
  }
  onSubmit(): any {
    console.log('submit', this.allowanceForm);
  }
  selectedAllowance(id, index): any {
    const selectedAllowanceValue = this.allowanceList.filter(t => t.id === Number(id));
    console.log('selectedAllowanceValue', selectedAllowanceValue[0]);
    this.controlsAllowance.at(index).patchValue({
      name: selectedAllowanceValue[0].id,
      calculated_fixed: selectedAllowanceValue[0].calculated_fixed,
      amount_percentage: selectedAllowanceValue[0].amount_percentage,
    });
    console.log('this.controlsAllowance.value', this.controlsAllowance.value);
  }
  appendAllowance(): any {
    this.controlsAllowance.push(this.createAllowance());
  }
  removeAllowance(i): any {
    this.controlsAllowance.removeAt(i);
  }
  ngOnInit() {
    this.allowanceForm = this.fb.group({
      list: this.fb.array([this.createAllowance()]),
    });
  }

}
