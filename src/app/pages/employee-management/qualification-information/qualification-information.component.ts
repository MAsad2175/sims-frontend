import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../services/configuration-service.service';
import {EmployeeManagementServiceService} from '../../../services/employee-management-service.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-qualification-information',
  templateUrl: './qualification-information.component.html',
  styleUrls: ['./qualification-information.component.scss']
})
export class QualificationInformationComponent implements OnInit {
  EducationForm: FormGroup;
  isEducationSubmit = false;
  employeeId: any;
  educationalListing: any;
  educationSingledata: any;
  educationSingledataid: any;
  constructor(private ngxLoader: NgxUiLoaderService,
              private configurationService: ConfigurationServiceService,
              private employeeService: EmployeeManagementServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params.id;
      if (this.employeeId) {
        this.getEducationalDate();
        this.getEducationDetailListing();
      }
    });
  }
  getEducationalDate(): any {
    setTimeout( () => {
      console.log('date education');
      $('.passing_year').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        orientation: 'bottom left',
      });
    }, 1000);
  }
  getEducationDetailListing(): any {
    this.ngxLoader.start();
    this.employeeService.educationList(this.employeeId).subscribe(data => {
      this.educationalListing = data;
      if (this.educationalListing.success === false) {
        this.educationalListing = [];
      }
      this.ngxLoader.stop();
    }, err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  editEducationIndex(id): any {
    this.ngxLoader.start();
    this.employeeService.getSingleeducationDetail(id).subscribe(data => {
      this.educationSingledata = data;
      this.educationSingledataid = data._id;
      this.EducationForm.patchValue({
        degree_title: this.educationSingledata.degree_title,
        passing_year: this.educationSingledata.passing_year,
        institute_name: this.educationSingledata.institute_name,
        marks_obtain: this.educationSingledata.marks_obtain,
      });
      $('.passing_year').datepicker('setDate', this.educationSingledata.passing_year);
      setTimeout((e) => {
        $('html, body').animate({scrollTop: 0}, 500);
      }, 500);
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  onEducationSubmit(): any {
    this.isEducationSubmit = true;
    const datePS = $('.passing_year').val();
    this.EducationForm.get('passing_year').setValue(datePS);
    if (this.EducationForm.invalid) {
      return;
    }
    if (this.educationSingledataid) {
      this.ngxLoader.start();
      this.employeeService.updateEducation(this.EducationForm.value, this.educationSingledata._id).subscribe(data => {
        this.isEducationSubmit = false;
        this.EducationForm.reset();
        this.getEducationDetailListing();
        this.ngxLoader.stop();
        this.educationSingledataid = 0;
      },
      err => {
        this.ngxLoader.stop();
        toastr.error(err.error.error);
      });
    } else {
      this.ngxLoader.start();
      this.employeeService.addEducation(this.EducationForm.value, this.employeeId).subscribe(data => {
        this.isEducationSubmit = false;
        this.ngxLoader.stop();
        this.EducationForm.reset();
        this.getEducationDetailListing();
      },
      err => {
        this.ngxLoader.stop();
        toastr.error(err.error.error);
      });
    }
  }

  ngOnInit() {
    this.EducationForm = this.fb.group({
      degree_title: ['', Validators.required],
      passing_year: ['', Validators.required],
      institute_name: ['', Validators.required],
      marks_obtain: ['', Validators.required],
    });
  }

}
