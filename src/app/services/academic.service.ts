import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class AcademicService {

  constructor( private http: HttpClient) { }

  submitAddClassForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/class_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAddClassForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/class_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getClassById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/class_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  classListing(current_page, per_page): Observable<any> {
    let results = this.http.get(`${environment.url}/config/class_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitAddSectionForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/section_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAddSectionForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/section_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getSectionById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/section_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  sectionListing(current_page, per_page): Observable<any> {
    let results = this.http.get(`${environment.url}/config/section_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  submitAddSubjectForm(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/subject_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  updateAddSubjectForm(value, id): Observable<any> {
    const results = this.http.put(`${environment.url}/config/subject_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id, {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getSubjectById(id): Observable<any> {
    const results = this.http.get(`${environment.url}/config/subject_detail?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  subjectListing(current_page, per_page): Observable<any> {
    let results = this.http.get(`${environment.url}/config/subject_list?auth_token=` + localStorage.getItem('auth_token') + '&page=' + current_page + '&per_page=' + per_page
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  subjectListingWithoutPagination(): Observable<any> {
    let results = this.http.get(`${environment.url}/config/subject_list_without_pagination?auth_token=` + localStorage.getItem('auth_token')
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  sectionListingWithoutPagination(): Observable<any> {
    let results = this.http.get(`${environment.url}/config/section_list_without_pagination?auth_token=` + localStorage.getItem('auth_token')
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  classListingWithoutPagination(): Observable<any> {
    let results = this.http.get(`${environment.url}/config/class_list_without_pagination?auth_token=` + localStorage.getItem('auth_token')
        , {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
  addSectionToAssignSubjects(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/class_section_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getSectionsOfSpecificClass( id ): Observable<any> {
    let results = this.http.get(`${environment.url}/config/class_section_list?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
    , {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  deleteSectionsOfSpecificClass( class_id, id ): Observable<any> {
    let results = this.http.delete(`${environment.url}/config/class_section_list?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id + '&class_id=' + class_id
    , {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  deleteSubjectOfSpecificSection( id, class_section ): Observable<any> {
    let results = this.http.delete(`${environment.url}/config/section_subject_list?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id + '&class_section=' + class_section
    , {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  addsubjectsToAssignSubjects(value): Observable<any> {
    const results = this.http.post(`${environment.url}/config/section_subject_list?auth_token=` + localStorage.getItem('auth_token'), {
      value
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
  getSujectsOfSpecificSection( id ): Observable<any> {
    let results = this.http.get(`${environment.url}/config/section_subject_list?auth_token=` + localStorage.getItem('auth_token') + '&id=' + id
    , {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(map(data => data));
    return results;
  }
}
