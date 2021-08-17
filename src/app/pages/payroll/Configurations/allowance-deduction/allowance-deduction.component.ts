import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PayrollServiceService} from '../../../../services/payroll-service.service';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-allowance-deduction',
  templateUrl: './allowance-deduction.component.html',
  styleUrls: ['./allowance-deduction.component.scss']
})
export class AllowanceDeductionComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  perPageValue: any;
  allowanceDeductionForm: FormGroup;
  editId: any;
  isAdd = false;
  searchString = '';

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private ngxLoader: NgxUiLoaderService,
              private payrollService: PayrollServiceService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
  ) {
  }

  editIndex(indexedValue): any {
    this.editId = indexedValue;
    $('#allowanceDeductionModal').modal('show');
    this.getAllowanceDeductionDetail();
  }

  loadPage(event): any {
    this.searchFilter();
  }

  searchFilterValue(): any {
    this.page = 1;
    this.searchFilter();
  }

  searchFilter(): any {
    this.ngxLoader.start();
    this.payrollService.allowanceDeductionListing(this.page, this.perPage, this.searchString, '').subscribe(
    data => {
      this.list = data;
      this.totalPages = this.list.total_count;
      this.list = this.list.items;
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }

  selectPaginationLimit(event): any {
    this.perPage = event;
    if (event === '') {
      this.perPage = this.totalPages;
      this.page = 1;
      this.perPageValue = 'All';
    } else {
      this.perPageValue = event;
    }
    this.searchFilter();
  }

  // add new bank starts
  onSubmit(): any {
    this.isAdd = true;
    if (this.allowanceDeductionForm.invalid) {
      return;
    }
    if (this.editId) {
      this.ngxLoader.start();
      this.payrollService.updateAllowanceDeductionForm(this.allowanceDeductionForm.value, this.editId).subscribe(data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#allowanceDeductionModal').modal('hide');
        toastr.success('Updated Successfully');
        this.allowanceDeductionForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    } else {
      this.ngxLoader.start();
      console.log('this.allowanceDeductionForm', this.allowanceDeductionForm.value);
      this.payrollService.submitAllowanceDeductionForm(this.allowanceDeductionForm.value).subscribe(data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#allowanceDeductionModal').modal('hide');
        toastr.success('Added Successfully');
        this.allowanceDeductionForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
  }

  getAllowanceDeductionDetail(): any {
    this.ngxLoader.start();
    this.payrollService.getAllowanceDeductionById(this.editId).subscribe(data => {
      this.allowanceDeductionForm.patchValue({
        type: data.type,
        code: data.code,
        name: data.name,
        status: data.status,
        calculated_fixed: data.calculated_fixed,
        amount_percentage: data.amount_percentage,
        description: data.description,
      });
      this.ngxLoader.stop();
    }, err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }

  openModal(): any {
    this.editId = 0;
    this.allowanceDeductionForm.reset();
    this.allowanceDeductionForm.get('type').setValue('Allowance');
    this.allowanceDeductionForm.get('calculated_fixed').setValue('Calculated');
    this.allowanceDeductionForm.get('status').setValue(true);
    $('#allowanceDeductionModal').modal('show');
  }

  // add new bank end
  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.allowanceDeductionForm = this.fb.group({
      type: ['Allowance', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      status: [true, Validators.required],
      calculated_fixed: ['Calculated', Validators.required],
      amount_percentage: [0, Validators.required],
      description: [''],
    });
    this.perPageValue = 25;
    this.searchFilter();
  }
}
