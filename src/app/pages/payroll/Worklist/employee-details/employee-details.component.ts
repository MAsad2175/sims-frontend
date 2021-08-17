import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../../services/configuration-service.service';
import {EmployeeManagementServiceService} from '../../../../services/employee-management-service.service';
import {environment} from '../../../../../environments/environment';

declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  teacherName = '';
  perPageValue: any;
  imagePath: any;
  designationList: any;
  name = '';
  employeeFileNo = '';
  nic = '';
  designation = '';

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private ngxLoader: NgxUiLoaderService,
              private configurationService: ConfigurationServiceService,
              private employeeService: EmployeeManagementServiceService) { }

  editIndex(indexedValue): any {
    this.router.navigate(['/payroll/details'], { queryParams: {id: indexedValue}});
  }
  loadPage(event): any {
    this.searchFilter();
  }
  searchFilterValue(): any{
    this.page = 1;
    this.searchFilter();
  }
  searchFilter(): any{
    this.ngxLoader.start();
    this.employeeService.teacherListing(this.page, this.perPage, this.designation, this.employeeFileNo, this.name, this.nic, '').subscribe(
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
  getDesignationListing(): any {
    this.configurationService.designationListing('', '', '', true).subscribe(
    data => {
      this.designationList = data;
      this.designationList = this.designationList.filter( t => t.status === true);
      setTimeout( () => {
        console.log('initialized');
        $('#designation').selectpicker();
        $('#designation').selectpicker('refresh');
      }, 500);
    },
    err => {
      this.ngxLoader.stop();
      $('#designation').selectpicker('refresh');
      toastr.error(err.error.error);
    });
  }
  ngOnInit(): void {
    this.imagePath = environment.url;
    this.perPageValue = 25;
    this.getDesignationListing();
    this.searchFilter();
  }
}
