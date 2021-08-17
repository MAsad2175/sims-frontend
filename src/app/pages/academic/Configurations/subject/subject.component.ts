import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ActivatedRoute, Router} from '@angular/router';
import { AcademicService} from '../../../../services/academic.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  employeeName = '';
  perPageValue: any;
  subjectForm: FormGroup;
  editId: any;
  isAdd = false;

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private ngxLoader: NgxUiLoaderService,
              private academicService: AcademicService,
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
    this.academicService.subjectListing(this.page, this.perPage).subscribe(
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
    if ( this.subjectForm.invalid ) {
      return;
    }
    if ( this.editId ) {
      this.ngxLoader.start();
      this.academicService.updateAddSubjectForm(this.subjectForm.value, this.editId).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#bankModal').modal('hide');
        toastr.success('Updated Successfully');
        this.subjectForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
    else {
      this.ngxLoader.start();
      console.log('this.subjectForm', this.subjectForm.value);
      this.academicService.submitAddSubjectForm(this.subjectForm.value).subscribe( data => {
        this.isAdd = false;
        this.ngxLoader.stop();
        $('#bankModal').modal('hide');
        toastr.success('Added Successfully');
        this.subjectForm.reset();
        this.searchFilter();
      }, err => {
        toastr.error(err.error.error);
        this.ngxLoader.stop();
      });
    }
  }
  getSalutationDetail(): any {
    this.ngxLoader.start();
    this.academicService.getSubjectById(this.editId).subscribe( data => {
      this.subjectForm.patchValue({
        code: data.code,
        name: data.name,
        total_marks: data.total_marks,
        passing_marks: data.passing_marks,
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
    this.subjectForm.reset();
    this.subjectForm.get('status').setValue(true);
    $('#bankModal').modal('show');
  }
  // add new bank end
  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.subjectForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      total_marks: ['', Validators.required],
      passing_marks: ['', Validators.required],
      status: [true, Validators.required],
      description: ['']
    });
    this.perPageValue = 25;
    this.searchFilter();
  }
}
