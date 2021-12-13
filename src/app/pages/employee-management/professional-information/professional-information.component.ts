import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../services/configuration-service.service';
import {EmployeeManagementServiceService} from '../../../services/employee-management-service.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-professional-information',
  templateUrl: './professional-information.component.html',
  styleUrls: ['./professional-information.component.scss']
})
export class ProfessionalInformationComponent implements OnInit {
  employeeId: any;
  ProfessionalForm: FormGroup;
  isProfessionalFormSubmit = false;
  professionalExperienceListing: any;
  professionalExperiencedataid: any;
  professionalExperiencedata: any;
  constructor(private ngxLoader: NgxUiLoaderService,
              private configurationService: ConfigurationServiceService,
              private employeeService: EmployeeManagementServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params.id;
      if (this.employeeId) {
        this.getProfessionalDate();
        this.getProfessionalExperienceList();
      }
    });
  }
  getProfessionalDate(): any {
    setTimeout( () => {
      console.log('date professional');
      $('.date_from').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        orientation: 'bottom left',
      });
      $('.date_to').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        orientation: 'bottom left',
      });
    }, 1000);
  }
  onProfessionalFormSubmit(): any {
    this.isProfessionalFormSubmit = true;
    const dateFrom = $('.date_from').val();
    const dateTo = $('.date_to').val();
    this.ProfessionalForm.get('date_from').setValue(dateFrom);
    this.ProfessionalForm.get('date_to').setValue(dateTo);
    if (this.ProfessionalForm.invalid) {
      return;
    }
    if (this.professionalExperiencedataid) {
      this.ngxLoader.start();
      this.employeeService.updateProfessionalExperience(this.ProfessionalForm.value, this.professionalExperiencedataid).subscribe(data => {
        this.isProfessionalFormSubmit = false;
        this.ProfessionalForm.reset();
        this.getProfessionalExperienceList();
        this.ngxLoader.stop();
        this.professionalExperiencedataid = 0;
      },
      err => {
        this.ngxLoader.stop();
        toastr.error(err.error.error);
      });
    }
    else {
      this.ngxLoader.start();
      this.employeeService.addProfessionalExperience(this.ProfessionalForm.value, this.employeeId).subscribe(data => {
        this.isProfessionalFormSubmit = false;
        this.ProfessionalForm.reset();
        this.getProfessionalExperienceList();
        this.ngxLoader.stop();
      },
      err => {
        this.ngxLoader.stop();
        toastr.error(err.error.error);
      });
    }
  }
  getProfessionalExperienceList(): any {
    this.ngxLoader.start();
    this.employeeService.ProfessionalExperienceList(this.employeeId).subscribe(data => {
      this.professionalExperienceListing = data;
      this.ngxLoader.stop();
    }, err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  editProfessionalExperienceIndex(id): any {
    this.ngxLoader.start();
    this.employeeService.getSingleProfessionalExperienceDetail(id).subscribe(data => {
      this.professionalExperiencedata = data;
      this.professionalExperiencedataid = data._id;
      this.ProfessionalForm.patchValue({
        job_title: this.professionalExperiencedata.job_title,
        date_from: this.professionalExperiencedata.date_from,
        organization: this.professionalExperiencedata.organization,
        date_to: this.professionalExperiencedata.date_to,
      });
      $('.date_from').datepicker('setDate', this.professionalExperiencedata.date_from);
      $('.date_to').datepicker('setDate', this.professionalExperiencedata.date_to);
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
  ngOnInit() {
    this.ProfessionalForm = this.fb.group({
      job_title: ['', Validators.required],
      date_from: ['', Validators.required],
      organization: ['', Validators.required],
      date_to: ['', Validators.required],
    });
  }

}
