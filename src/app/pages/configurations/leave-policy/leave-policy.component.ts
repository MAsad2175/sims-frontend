import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigurationServiceService} from '../../../services/configuration-service.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-leave-policy',
  templateUrl: './leave-policy.component.html',
  styleUrls: ['./leave-policy.component.scss']
})
export class LeavePolicyComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  employeeName = '';
  perPageValue: any;
  leavePolicy: FormGroup;
  editId: any;
  isAdd = false;
  leaveType: any;

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private ngxLoader: NgxUiLoaderService,
              private configurationService: ConfigurationServiceService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.editId = Number(params.id);
      if ( this.editId ) {
        // this.getLeavePolicyDetail();
      } else {
        this.getLeveType();
      }
    });
  }

  editIndex(indexedValue): any {
    this.editId = indexedValue;
    $('#bankModal').modal('show');
    // this.getLeavePolicyDetails();
  }
  loadPage(event): any {
    this.searchFilter();
  }
  searchFilterValue(): any {
    this.page = 1;
    this.searchFilter();
  }
  searchFilter(): any{
    this.ngxLoader.start();
    this.configurationService.leaveTypeListing(this.page, this.perPage, this.employeeName, '').subscribe(
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
    if ( event === '' ) {
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
    if ( this.leavePolicy.invalid ) {
      return;
    }
    if ( this.editId ) {
      this.ngxLoader.start();
      // this.configurationService.updateleavePolicy(this.leavePolicy.value, this.editId).subscribe( data => {
      //   this.isAdd = false;
      //   this.ngxLoader.stop();
      //   $('#bankModal').modal('hide');
      //   toastr.success('Updated Successfully');
      //   this.leavePolicy.reset();
      //   this.searchFilter();
      // }, err => {
      //   toastr.error(err.error.error);
      //   this.ngxLoader.stop();
      // });
    }
    else {
      this.ngxLoader.start();
      console.log('this.leavePolicy', this.leavePolicy.value);
      this.configurationService.submitleavePolicy(this.leavePolicy.value).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#bankModal').modal('hide');
        toastr.success('Added Successfully');
        this.leavePolicy.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
  }
  getSalutationDetail(): any {
    this.ngxLoader.start();
    this.configurationService.getLeaveTypeById(this.editId).subscribe( data => {
      this.leavePolicy.patchValue({
        code: data.code,
        name: data.name,
        status: data.status,
        description: data.description,
      });
      for ( var i = 0 ; i < data.length; i ++ ) {
        if ( data[i].status === 'Active' ) {
          this.controlLeavePolicy.push( this.leavePolicyData(data.leaveType[i]) );
        }
      }
      this.ngxLoader.stop();
    }, err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  openModal(): any {
    this.editId = 0;
    this.leavePolicy.reset();
    this.leavePolicy.get('status').setValue(true);
    $('#bankModal').modal('show');
    for ( var i = 0 ; i < this.leaveType.length; i ++ ) {
      if ( this.leaveType[i].status === 'Active' ) {
        this.controlLeavePolicy.push( this.leavePolicyData(this.leaveType[i]) );
      }
    }
  }
  leavePolicyCompleteData(data): any {
    return this.fb.group({
      leave_type: data.leave_type,
      type_name: data.type_name,
      total_leaves: [data.total_leaves, Validators.required],
      status: data.status,
      id: data.id,
    });
  }
  leavePolicyData(data): any {
    return this.fb.group({
      leave_type: data.id,
      type_name: data.type_name,
      total_leaves: [0, Validators.required],
      status: true,
      id: ''
    });
  }
  get controlLeavePolicy(): any {
    return ( this.leavePolicy.get('leave_type_list') as FormArray);
  }
  // add new bank end
  getLeveType(): any {
    this.configurationService.getLeaveTypeWithOutPagination(-1).subscribe( data => {
      this.leaveType = data.items;
      console.log(this.leaveType);
      for ( var i = 0 ; i < this.leaveType.length; i ++ ) {
        if ( this.leaveType[i].status === 'Active' ) {
          this.controlLeavePolicy.push( this.leavePolicyData(this.leaveType[i]) );
        }
      }
    }, err => {
      toastr.error(err.error.error);
    });
  }
  appendTotalLeavesValue(i): any {
    setTimeout( (e) => {
      if ( this.controlLeavePolicy.at(i).get('total_leaves').value === '' || this.controlLeavePolicy.at(i).get('total_leaves').value === null || this.controlLeavePolicy.at(i).get('total_leaves').value === undefined ) {
        this.controlLeavePolicy.at(i).get('total_leaves').setValue(0);
      }
    }, 1000);
  }
  ngOnInit(): void {
    // this.editId = Number(this.route.snapshot.queryParamMap.get('id'));
    // if ( !this.editId ) {
    //   this.getLeveType();
    // }
    this.leavePolicy = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      status: [true, Validators.required],
      description: [''],
      leave_type_list: this.fb.array([]),
    });
    this.perPageValue = 25;
    this.searchFilter();
  }
}
