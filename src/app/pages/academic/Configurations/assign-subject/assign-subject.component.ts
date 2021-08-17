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
  subjectsOfSpecificClassSection: any;
  subjectsOfSpecificSection: any;
  sectionsListForClassModal: any;
  classSubjectRelationId: any;

  constructor( private ngxLoader: NgxUiLoaderService,
               private academicService: AcademicService,
               private fb: FormBuilder) { }
  classListing(): any {
    this.academicService.classListing('', '', '', true).subscribe(
    data => {
      this.classList = data;
      setTimeout( () => {
        this.getSectionOfSpecificClass(this.classList[0].id);
      }, 1000);
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  sectionListing(): any {
    this.academicService.sectionListing('', '', '', true).subscribe(
    data => {
      this.sectionList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  subjectListing(): any {
    this.academicService.subjectListing('', '', '', true).subscribe(
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
    if ( this.sectionForm.invalid ) {
      return;
    }
    for ( var i = 0; i < this.sectionOfSpecificClass.length; i++ ) {
      if ( this.sectionOfSpecificClass[i].section.id === Number(this.sectionForm.value.section) ) {
        toastr.error('Section Already Exists');
        return;
      }
    }
    this.academicService.addSectionToAssignSubjects( this.sectionForm.value ).subscribe(
    data => {
      this.isSectionAdd = false;
      this.getSectionOfSpecificClass(data.classes);
    },
    err => {
      toastr.error(err.error.error);
    });
    $('#sectionModal').modal('hide');
  }
  getSectionOfSpecificClass(id): any {
    this.classId = id;
    this.ngxLoader.start();
    this.academicService.getSectionsOfSpecificClass( id ).subscribe(
    data => {
      this.sectionOfSpecificClass = data;
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  getSubjectOfSpecificClass(): any {
    this.academicService.getSujectsOfSpecificSection( this.classSubjectRelationId ).subscribe(data => {
      this.subjectsOfSpecificSection = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  deleteSpecificIndexOfSection( classId, sectionId): any {
    this.academicService.deleteSectionsOfSpecificClass( classId, sectionId ).subscribe(
    data => {
      this.sectionOfSpecificClass = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  openSubjectModal(): any {
    $('#subjectModal').modal('show');
  }
  onSubjectSubmit(): any {
    this.isSubjectAdd = true;
    if ( this.subjectForm.invalid ) {
      return;
    }
    this.academicService.addsubjectsToAssignSubjects( this.subjectForm.value ).subscribe(
    data => {
      this.subjectsOfSpecificClassSection = data;
      this.isSubjectAdd = false;
      this.getSubjectOfSpecificClass();
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getSectionsForClassModal(id): any {
    console.log('id', id);
    this.academicService.getSectionsOfSpecificClass( id ).subscribe(
    data => {
      this.sectionsListForClassModal = data;
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  getSubjectMarksForClassModal( id ): any {
    const data = this.subjectList.filter( t => t.id === Number(id) );
    this.subjectForm.patchValue({
      total_marks: data[0].total_marks,
      passing_marks: data[0].passing_marks,
    });
  }
  getSectionDetailClassModal( id ): any {
    const data = this.sectionsListForClassModal.filter( t => t.section.id === Number(id) );
    this.classSubjectRelationId = data[0].id;
    this.subjectForm.get('class_section').setValue(data[0].id);
  }
  ngOnInit() {
    this.sectionForm = this.fb.group({
      classes: ['', Validators.required],
      section: ['', Validators.required],
    });
    this.subjectForm = this.fb.group({
      class_section: ['', Validators.required],
      classes: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['', Validators.required],
      total_marks: ['', Validators.required],
      passing_marks: ['', Validators.required],
    });
    this.classListing();
    this.sectionListing();
    this.subjectListing();
  }

}
