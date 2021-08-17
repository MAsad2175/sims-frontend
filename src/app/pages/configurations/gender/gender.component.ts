import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigurationServiceService} from '../../../services/configuration-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  employeeName = '';
  perPageValue: any;
  genderForm: FormGroup;
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
    $('#bankModal').modal('show');
    this.getSalutationDetail();
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
    this.configurationService.genderListing(this.page, this.perPage, this.employeeName, '').subscribe(
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
    if ( this.genderForm.invalid ) {
      return;
    }
    if ( this.editId ) {
      this.ngxLoader.start();
      this.configurationService.updateGenderForm(this.genderForm.value, this.editId).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#bankModal').modal('hide');
        toastr.success('Updated Successfully');
        this.genderForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
    else {
      this.ngxLoader.start();
      console.log('this.genderForm', this.genderForm.value);
      this.configurationService.submitGenderForm(this.genderForm.value).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#bankModal').modal('hide');
        toastr.success('Added Successfully');
        this.genderForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
  }
  getSalutationDetail(): any {
    this.ngxLoader.start();
    this.configurationService.getGenderById(this.editId).subscribe( data => {
      this.genderForm.patchValue({
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
    this.genderForm.reset();
    this.genderForm.get('status').setValue(true);
    $('#bankModal').modal('show');
  }
  // add new bank end
  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.genderForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      status: [true, Validators.required],
      description: ['']
    });
    this.perPageValue = 25;
    this.searchFilter();
  }
}
