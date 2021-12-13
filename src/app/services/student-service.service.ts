import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class StudentServiceService {

  constructor(private http: HttpClient) { }
  submitStudentForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/sims/student_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  studentListing(current_page, per_page, name, registration_no): Observable<any> {
    let results = this.http.get(`${environment.url}/sims/student_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&name=' + name + '&registration_no=' + registration_no
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
}
