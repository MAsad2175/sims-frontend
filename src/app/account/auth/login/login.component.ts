import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

declare var toastr: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmit = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private ngxLoader: NgxUiLoaderService) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard' ]);
    }
  }

  submit(): any {
    // this.chRef.detectChanges();
    // this.chRef.markForCheck();
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.ngxLoader.start();
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      localStorage.setItem('first_name', data.first_name);
      localStorage.setItem('middle_name', data.middle_name);
      localStorage.setItem('last_name', data.last_name);
      localStorage.setItem('email', data.email);
      localStorage.setItem('auth_token', data.auth_token);
      this.ngxLoader.stop();
      toastr.success('Welcome');
      this.router.navigate(['dashboard']);
    },
    error => {
      this.ngxLoader.stop();
      toastr.error(error.error.message);
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)]) ]
    });
  }

}
