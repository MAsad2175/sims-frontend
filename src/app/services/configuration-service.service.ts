import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class ConfigurationServiceService {

  constructor(private http: HttpClient) { }

  submitAddSalutationForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/salutation_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAddSalutationForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/salutation_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getSalutationById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/salutation_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  salutationListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/salutation_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitAddBankForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/bank_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAddBankForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/bank_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getBankById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/bank_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  bankListing(current_page, per_page): Observable<any> {
    let results = this.http.get(`${environment.url}/config/bank_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitAddBloodGroupForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/blood_group_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAddBloodGroupForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/blood_group_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getBloodGroupById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/blood_group_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  bloodGroupListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/blood_group_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitGenderForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/gender_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateGenderForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/gender_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getGenderById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/gender_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  genderListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/gender_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitLeaveTypeForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/abc?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateLeaveTypeForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/abc?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getLeaveTypeById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/abc?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  leaveTypeListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/abc?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitleavePolicy(value) {
    const results = this.http.post(`${environment.url}/config/abc?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getLeaveTypeWithOutPagination(per_page):Observable<any> {
    let results = this.http.get(`${environment.url}/hr/leave_type_list?auth_token=` + 'jsrUoiZJmMD9ZuwQrpQZ' + '&medical_unit_id=' + '136' + '&per_page=' + per_page
        , {
          headers: new HttpHeaders({
            // //'AuthenticationToken': localStorage.getItem('auth_token'),
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitUserTypeForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/user_type_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateUserTypeForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/user_type_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getUserTypeById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/user_type_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  userTypeListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/user_type_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitDepartmentForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/department_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateDepartmentForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/department_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getDepartmentById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/department_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  departmentListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/department_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitDesignationForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/designation_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateDesignationForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/designation_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getDesignationById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/designation_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  designationListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/designation_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitSalaryModel(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/salary_model_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateSalaryModel(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/salary_model_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getSalaryModelById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/salary_model_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  salaryModelListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/salary_model_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
}
