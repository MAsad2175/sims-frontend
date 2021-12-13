import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../services/configuration-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {EmployeeManagementServiceService} from '../../../services/employee-management-service.service';
import {LocationServiceService} from "../../../services/location-service.service";

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {
  addBasicInfomarion: FormGroup;
  isBasicInfoSubmit = false;
  employeeId: any;
  salutationList: any;
  genderList: any;
  bloodGroupList: any;
  salryModelList: any;
  bankList: any;
  designationList: any;
  departmentList: any;
  userImage: any;
  baseUrl: any;
  countries = [];
  states = [];
  cities = [];
  editCountryID: number;
  editstateID: number;
  constructor(private ngxLoader: NgxUiLoaderService,
              private configurationService: ConfigurationServiceService,
              private employeeService: EmployeeManagementServiceService,
              private locationService: LocationServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params.id;
      this.getSalutationListingWithoutPagination();
      this.getGenderListWithoutPagination();
      this.getBloodGroupListWithoutPagination();
      this.getBankListWithoutPagination();
      this.getDesignationListingWithoutPagination();
      this.getDepartmentListingWithoutPagination();
      this.getSalaryModelListingWithoutPagination();
      if (this.employeeId) {
        this.getBasicInformationById();
      }
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
    $('#hired_on').datepicker({
      format: 'dd-mm-yyyy',
      orientation: 'bottom left',
    });
    $('#join_on').datepicker({
      format: 'dd-mm-yyyy',
      orientation: 'bottom left',
    });
    $('#dob').datepicker({
      format: 'dd-mm-yyyy',
      orientation: 'bottom left',
    });
    $('#nic_expiry_date').datepicker({
      format: 'dd-mm-yyyy',
      orientation: 'bottom left',
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
      this.addBasicInfomarion.get('profile_image').setValue(d);
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
  getSalutationListingWithoutPagination(): any {
    this.configurationService.salutationListingWithoutPagination().subscribe(
    data => {
      this.salutationList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
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
  getBankListWithoutPagination(): any {
    this.configurationService.getBankListWithoutPagination().subscribe(
    data => {
      this.bankList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getDesignationListingWithoutPagination(): any {
    this.configurationService.getDesignationListingWithoutPagination().subscribe(
    data => {
      this.designationList = data;
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }
  getDepartmentListingWithoutPagination(): any {
    this.configurationService.getDepartmentListingWithoutPagination().subscribe(
    data => {
      this.departmentList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getSalaryModelListingWithoutPagination(): any {
    this.configurationService.getSalaryModelListingWithoutPagination().subscribe(
    data => {
      this.salryModelList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  getBloodGroupListWithoutPagination(): any {
    this.configurationService.getBloodGroupListWithoutPagination().subscribe(
    data => {
      this.bloodGroupList = data;
    },
    err => {
      toastr.error(err.error.error);
    });
  }
  submitBasicInfomarion(): any {
    this.isBasicInfoSubmit = true;
    const hiredOn = $('#hired_on').val();
    const joinOn = $('#join_on').val();
    const DOB = $('#dob').val();
    const NED = $('#nic_expiry_date').val();
    this.addBasicInfomarion.patchValue({
      hired_on: hiredOn,
      joined_on: joinOn,
      dob: DOB,
      nic_expiry_date: NED,
    });
    if (this.addBasicInfomarion.invalid) {
      return;
    }
    if ( this.employeeId ) {
      this.ngxLoader.start();
      this.employeeService.updateTeacherBasicInformation(this.addBasicInfomarion.value, this.employeeId).subscribe(data => {
        this.isBasicInfoSubmit = false;
        this.ngxLoader.stop();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/employee/add'], { queryParams: {id: this.employeeId}}); // navigate to same route
        });
        toastr.success('Successfully Submitted');
      },
      err => {
        this.ngxLoader.stop();
        toastr.error(err.error.error);
      });
    } else {
      this.ngxLoader.start();
      this.employeeService.submitTeacherBasicInformation(this.addBasicInfomarion.value).subscribe(data => {
        this.employeeId = data._id;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/employee/add'], { queryParams: {id: this.employeeId}}); // navigate to same route
        });
        this.isBasicInfoSubmit = false;
        this.addBasicInfomarion.reset();
        this.ngxLoader.stop();
        $('#basicChnagesModal').modal('show');
        toastr.success('Successfully Submitted');
      },
      err => {
        this.ngxLoader.stop();
        toastr.error(err.error.error);
      });
    }
  }
  getBasicInformationById(): any {
    this.ngxLoader.start();
    this.employeeService.submitTeacherBasicInformationById(this.employeeId).subscribe(data => {
      this.userImage = environment.url;
      if (data.image) {
        $('#upload_image').attr('src', this.userImage + '/sims' + data.image);
      }
      this.addBasicInfomarion.patchValue({
        profile_image: data.profile_image,
        salutation: data.salutation,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        teacher_file_no: data.teacher_file_no,
        hired_on: data.hired_on,
        joined_on: data.joined_on,
        department: data.department,
        designation: data.designation,
        salary_model: data.salary_model,
        gender: data.gender,
        blood_group: data.blood_group,
        nic: data.nic,
        nic_expiry_date: data.nic_expiry_date,
        passport_no: data.passport_no,
        primary_contact: data.primary_contact,
        bank_name: data.bank_name,
        bank_acc_no: data.bank_acc_no,
        status: data.status,
        address: data.address,
        country: data.country,
        state: data.state,
        city: data.city,
      });
      $('#hired_on').datepicker('setDate', data.hired_on);
      $('#dob').datepicker('setDate', data.dob);
      $('#joined_on').datepicker('setDate', data.joined_on);
      $('#nic_expiry_date').datepicker('setDate', data.nic_expiry_date);
      this.ngxLoader.stop();
    },
    err => {
      this.ngxLoader.stop();
      toastr.error(err.error.error);
    });
  }

  ngOnInit() {
    this.getDate();
    this.userImage = environment.url;
    this.addBasicInfomarion = this.fb.group({
      profile_image: [''],
      salutation: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      teacher_file_no: ['', Validators.required],
      hired_on: [''],
      joined_on: [''],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      salary_model: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['', Validators.required],
      dob: ['', Validators.required],
      nic: ['', Validators.required],
      nic_expiry_date: [''],
      passport_no: [''],
      primary_contact: ['', Validators.required],
      bank_name: ['', Validators.required],
      bank_acc_no: [''],
      address: [''],
      status: [true, Validators.required],
      country: [''],
      state: [''],
      city: [''],
    });
  }

}
