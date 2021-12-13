import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AcademicService} from '../../../../services/academic.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-assign-subject',
  templateUrl: './assign-subject.component.html',
  styleUrls: ['./assign-subject.component.scss']
})
export class AssignSubjectComponent implements OnInit {
  classList: any;
  sectionList: any;
  subjectList: any;
  sectionForm: FormGroup;
  subjectForm: FormGroup;
  isSectionAdd = false;
  isSubjectAdd = false;
  classId: any;
  sectionId: any;
  class: any;
  sectionOfSpecificClass: any;
  subjectsOfSpecificSection: any;
  relationalSubjectId: any;

  constructor( private ngxLoader: NgxUiLoaderService,
               private academicService: AcademicService,
               private fb: FormBuilder) { }
  classListing(): any {
    this.academicService.classListingWithoutPagination().subscribe(
    data => {
      this.classList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  sectionListing(): any {
    this.academicService.sectionListingWithoutPagination().subscribe(
    data => {
      this.sectionList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  subjectListing(): any {
    this.academicService.subjectListingWithoutPagination().subscribe(
    data => {
      this.subjectList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  openSectionModal(): any {
    this.sectionForm.get('classes').setValue('');
    this.sectionForm.get('section').setValue('');
    $('#sectionModal').modal('show');
  }
  onSectionSubmit(): any {
    this.isSectionAdd = true;
    if (!this.classId) {
      toastr.error('Please Select Class');
      return;
    }
    this.sectionForm.get('classes').setValue(this.classId);
    if ( this.sectionForm.invalid ) {
      return;
    }
    for ( var i = 0; i < this.sectionOfSpecificClass.length; i++ ) {
      if ( this.sectionOfSpecificClass[i].section._id === this.sectionForm.value.section ) {
        toastr.error('Section Already Exists');
        return;
      }
    }
    this.academicService.addSectionToAssignSubjects( this.sectionForm.value ).subscribe(
    data => {
      this.isSectionAdd = false;
      this.sectionOfSpecificClass = data;
      $('#sectionModal').modal('hide');
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getSectionOfSpecificClass(id): any {
    this.classId = id;
    this.academicService.getSectionsOfSpecificClass( id ).subscribe(
    data => {
      this.sectionOfSpecificClass = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getSubjectOfSpecificClass(id, sectionId): any {
    this.sectionId = sectionId;
    this.relationalSubjectId = id;
    this.subjectForm.get('class_section').setValue(id);
    this.academicService.getSujectsOfSpecificSection( id ).subscribe(data => {
      this.subjectsOfSpecificSection = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  deleteSpecificIndexOfSection(classId, sectionId): any {
    this.academicService.deleteSectionsOfSpecificClass( classId, sectionId ).subscribe(
    data => {
      this.sectionOfSpecificClass = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  deleteSpecificIndexOfSubject(id, classSection): any {
    this.academicService.deleteSubjectOfSpecificSection( id, classSection ).subscribe(
    data => {
      this.subjectsOfSpecificSection = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  openSubjectModal(): any {
    this.subjectForm.patchValue({
      class_section: '',
      subject: '',
      total_marks: '',
      passing_marks: '',
    });
    $('#subjectModal').modal('show');
  }
  onSubjectSubmit(): any {
    this.isSubjectAdd = true;
    if ( !this.relationalSubjectId ) {
      toastr.error('Please Select Section');
      return;
    }
    this.subjectForm.get('class_section').setValue(this.relationalSubjectId);
    if ( this.subjectForm.invalid ) {
      return;
    }
    this.ngxLoader.start();
    this.academicService.addsubjectsToAssignSubjects( this.subjectForm.value ).subscribe(
    data => {
      this.subjectsOfSpecificSection = data;
      this.isSubjectAdd = false;
      this.ngxLoader.stop();
      $('#subjectModal').modal('hide');
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  getSubjectMarksForClassModal( id ): any {
    const data = this.subjectList.find( t => t._id === id );
    this.subjectForm.patchValue({
      total_marks: data.total_marks,
      passing_marks: data.passing_marks,
    });
  }
  ngOnInit() {
    this.sectionForm = this.fb.group({
      classes: ['', Validators.required],
      section: ['', Validators.required],
    });
    this.subjectForm = this.fb.group({
      class_section: ['', Validators.required],
      subject: ['', Validators.required],
      total_marks: ['', Validators.required],
      passing_marks: ['', Validators.required],
    });
    this.classListing();
    this.sectionListing();
    this.subjectListing();
  }

}
