import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  notAuthenticated(): any {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  login(username, password): Observable<any>{
    return this.http.post(`${environment.url}/sims/login`, {username, password},
  {headers: new HttpHeaders(
        {
          'content-type': 'application/json'
        }
    )});
  }
}
