import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PayrollServiceService} from '../../../../services/payroll-service.service';

declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.scss']
})
export class DeductionComponent implements OnInit {
  deductionForm: FormGroup;
  employeeId: any;
  deductionList: any;
  isDeductionAdd = false;

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
      this.deductionList = data;
      this.deductionList = this.deductionList.filter( t => t.type === 'Deduction');
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  createDeduction(): any {
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
  get controlsDeduction(): any {
    return ( this.deductionForm.get('list') as FormArray );
  }
  onSubmit(): any {
    console.log('submit', this.deductionForm);
  }
  selectedDeduction(id, index): any {
    const selectedDeductionValue = this.deductionList.filter(t => t.id === Number(id));
    console.log('selectedDeductionValue', selectedDeductionValue[0]);
    this.controlsDeduction.at(index).patchValue({
      name: selectedDeductionValue[0].id,
      calculated_fixed: selectedDeductionValue[0].calculated_fixed,
      amount_percentage: selectedDeductionValue[0].amount_percentage,
    });
    console.log('this.controlsDeduction.value', this.controlsDeduction.value);
  }
  appendDeduction(): any {
    this.controlsDeduction.push(this.createDeduction());
  }
  removeDeduction(i): any {
    this.controlsDeduction.removeAt(i);
  }
  ngOnInit() {
    this.deductionForm = this.fb.group({
      list: this.fb.array([this.createDeduction()]),
    });
  }
}
