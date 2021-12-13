import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../services/configuration-service.service';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  employeeName = '';
  perPageValue: any;
  religionForm: FormGroup;
  editId: any;
  isAdd = false;

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private ngxLoader: NgxUiLoaderService,
              private configurationService: ConfigurationServiceService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
  ) { }

  editIndex(indexedValue): any {
    this.editId = indexedValue;
    $('#religionModal').modal('show');
    this.getReligionDetail();
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
    this.configurationService.religionListing(this.page, this.perPage).subscribe(
        data => {
          this.list = data;
          this.totalPages = this.list.total_count;
          this.list = this.list.items;
          this.ngxLoader.stop();
        },
        err => {
          this.ngxLoader.stop();
          toastr.error(err.error.error);
        }
    );
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
    if ( this.religionForm.invalid ) {
      return;
    }
    if ( this.editId ) {
      this.ngxLoader.start();
      this.configurationService.updateReligionForm(this.religionForm.value, this.editId).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#religionModal').modal('hide');
        toastr.success('Updated Successfully');
        this.religionForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
    else {
      this.ngxLoader.start();
      console.log('this.religionForm', this.religionForm.value);
      this.configurationService.submitReligionForm(this.religionForm.value).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#religionModal').modal('hide');
        toastr.success('Added Successfully');
        this.religionForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
  }
  getReligionDetail(): any {
    this.ngxLoader.start();
    this.configurationService.getReligionById(this.editId).subscribe( data => {
      this.religionForm.patchValue({
        code: data.code,
        name: data.name,
        status: data.status,
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
    this.religionForm.reset();
    this.religionForm.get('status').setValue(true);
    $('#religionModal').modal('show');
  }
  // add new bank end
  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.religionForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      status: [true, Validators.required],
      description: ['']
    });
    this.perPageValue = 25;
    this.searchFilter();
  }
}
