import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class EmployeeManagementServiceService {

  constructor(private http: HttpClient) { }

  submitTeacherBasicInformation(value): Observable<any> {
    const results = this.http.post(`${environment.url}/sims/teacher_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateTeacherBasicInformation(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/sims/teacher_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  submitTeacherBasicInformationById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/sims/teacher_detail?id=` + id + '&auth_token=' + localStorage.getItem('auth_token')
        , {headers: new HttpHeaders({
            AuthenticationToken: localStorage.getItem('auth_token'),
            Accept: 'application/json'
          })}).pipe(map(data => data));
    return results;
  }
  teacherListing(current_page, per_page, designation, file_no, name, nic, status): Observable<any> {
    let results = this.http.get(`${environment.url}/sims/teacher_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page + '&designation=' + designation + '&file_no=' + file_no + '&name=' + name + '&nic=' + nic + '&status=' + status
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  addEducation(value, id) {
    const results = this.http.post(`${environment.url}/sims/teacher_education?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateEducation(value, id) {
    const results = this.http.put(`${environment.url}/sims/teacher_education_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  educationList(id) {
    const results = this.http.get(`${environment.url}/sims/teacher_education?id=` + id + '&auth_token=' + localStorage.getItem('auth_token')
        , {headers: new HttpHeaders({
            AuthenticationToken: localStorage.getItem('auth_token'),
            Accept: 'application/json'
          })}).pipe(map(data => data));
    return results;
  }
  getSingleeducationDetail(id): Observable<any> {
    const results = this.http.get(`${environment.url}/sims/teacher_education_detail?id=` + id + '&auth_token=' + localStorage.getItem('auth_token')
        , {headers: new HttpHeaders({
            AuthenticationToken: localStorage.getItem('auth_token'),
            Accept: 'application/json'
          })}).pipe(map(data => data));
    return results;
  }
  addProfessionalExperience(value, id) {
    const results = this.http.post(`${environment.url}/sims/teacher_professional_exp?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateProfessionalExperience(value, id) {
    const results = this.http.put(`${environment.url}/sims/teacher_profession_exp_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  ProfessionalExperienceList(id) {
    const results = this.http.get(`${environment.url}/sims/teacher_professional_exp?id=` + id + '&auth_token=' + localStorage.getItem('auth_token')
        , {headers: new HttpHeaders({
            AuthenticationToken: localStorage.getItem('auth_token'),
            Accept: 'application/json'
          })}).pipe(map(data => data));
    return results;
  }
  getSingleProfessionalExperienceDetail(id): Observable<any> {
    const results = this.http.get(`${environment.url}/sims/teacher_profession_exp_detail?id=` + id + '&auth_token=' + localStorage.getItem('auth_token')
        , {headers: new HttpHeaders({
            AuthenticationToken: localStorage.getItem('auth_token'),
            Accept: 'application/json'
          })}).pipe(map(data => data));
    return results;
  }
}
