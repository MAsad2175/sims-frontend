import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ConfigurationServiceService} from '../../../../services/configuration-service.service';
import {EmployeeManagementServiceService} from '../../../../services/employee-management-service.service';
import {environment} from '../../../../../environments/environment';
import {StudentServiceService} from "../../../../services/student-service.service";

declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.scss']
})
export class StudentListingComponent implements OnInit {
  list: any;
  page = 1;
  totalPages: any;
  perPage = 25;
  perPageValue: any;
  imagePath: any;
  name = '';
  registrationNo = '';

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private ngxLoader: NgxUiLoaderService,
              private studentService: StudentServiceService) { }

  editIndex(indexedValue): any {
    this.router.navigate(['/employee/add'], { queryParams: {id: indexedValue}});
  }
  loadPage(event): any {
    this.searchFilter();
  }
  searchFilterValue(): any {
    this.page = 1;
    this.searchFilter();
  }
  searchFilter(): any {
    this.ngxLoader.start();
    this.studentService.studentListing(this.page, this.perPage, this.name, this.registrationNo).subscribe(
        data => {
      this.list = data;
      this.totalPages = this.list.total_count;
      this.list = this.list.items;
      if (!this.list.length) {
        toastr.error('Record Not Found!');
      }
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
  ngOnInit(): void {
    this.imagePath = environment.url;
    this.perPageValue = 25;
    this.searchFilter();
  }
}
