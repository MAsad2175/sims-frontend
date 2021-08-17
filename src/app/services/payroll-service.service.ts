import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()

export class PayrollServiceService {

  constructor(private http: HttpClient) { }

  submitAllowanceDeductionForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/allowance_deduction_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAllowanceDeductionForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/allowance_deduction_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getAllowanceDeductionById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/allowance_deduction_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
    , {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  allowanceDeductionListing(current_page, per_page, search_string, status): Observable<any> {
    let results = this.http.get(`${environment.url}/config/allowance_deduction_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&search_string=' + search_string + '&status=' + status
    , {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  submitAssignSalary(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/abc?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }

}
