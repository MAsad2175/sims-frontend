import { Component, OnInit } from '@angular/core';
import {AcademicService} from '../../../../services/academic.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscriber} from "rxjs";
import {ConfigurationServiceService} from "../../../../services/configuration-service.service";
import {StudentServiceService} from "../../../../services/student-service.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  classList: any;
  baseUrl: any;
  genderList: any;
  religionList: any;
  isAdd = false;

  constructor( private academicService: AcademicService,
               private fb: FormBuilder,
               private studentService: StudentServiceService,
               private ngxLoader: NgxUiLoaderService,
               private configurationService: ConfigurationServiceService) {
    this.studentForm = this.fb.group({
      profile_image: [''],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      registration_no: ['', Validators.required],
      class: ['', Validators.required],
      admission_date: ['', Validators.required],
      mobile_no: [''],
      dob: ['', Validators.required],
      nic: ['', Validators.required],
      orphen_student: [false, Validators.required],
      gender: ['', Validators.required],
      cast: [''],
      religion: ['', Validators.required],
      address: ['', Validators.required],
      father_name: ['', Validators.required],
      father_nic: ['', Validators.required],
      father_education: [''],
      father_mobile_no: ['', Validators.required],
      father_profession: ['', Validators.required],
      status: [true],
    });
  }
  uploadProfileImage($event): any {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }
  convertToBase64(file: File): any {
    const observable = new Observable( (subscriber: Subscriber <any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe( (d) => {
      this.baseUrl = d;
      this.studentForm.get('profile_image').setValue(d);
    });
  }
  readFile(file: File, subscriber: Subscriber<any>): any {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = (e) => {
      subscriber.next(filereader.result);
      const img = $('#upload_image').attr('src', this.baseUrl);
      $('#upload_image').html(img);
      subscriber.complete();
    };

    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  getGenderListWithoutPagination(): any {
    this.configurationService.getGenderListWithoutPagination().subscribe(
    data => {
      this.genderList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getReligionListWithoutPagination(): any {
    this.configurationService.getReligionListWithoutPagination().subscribe(
    data => {
      this.religionList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  classListing(): any {
    this.academicService.classListingWithoutPagination().subscribe(
    data => {
      this.classList = data;
      setTimeout( () => {
        $('#class').selectpicker('refresh');
        $('#class').selectpicker();
      });
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  _onlyNumeric(event: any): any {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getDate(): any {
    $('#admission_date').datepicker({
      format: 'dd-mm-yyyy',
      orientation: 'bottom left',
    });
    $('#dob').datepicker({
      format: 'dd-mm-yyyy',
      orientation: 'bottom left',
    });
  }
  onSubmit(): any {
    this.isAdd = true;
    this.studentForm.patchValue({
      dob: $('#dob').val(),
      admission_date: $('#admission_date').val(),
    });
    if ( this.studentForm.invalid ) {
      return;
    }
    this.ngxLoader.start();
    this.studentService.submitStudentForm(this.studentForm.value).subscribe(data => {
      this.isAdd = false;
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  ngOnInit() {
    this.classListing();
    this.getGenderListWithoutPagination();
    this.getReligionListWithoutPagination();
    this.getDate();
  }

}
