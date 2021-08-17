import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private http: HttpClient) {
  }
  countries(): Observable<any> {
    let results = this.http.get(`${environment.url}/v4/countries?auth_token=` + localStorage.getItem('auth_token')
        , {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        }).pipe(map(data => data));
    return results;
  }
}
