import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  menus: any;
  subMenus: any;
  activeRoute;
  constructor(private authService: AuthService,
              private router: Router) { }
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Get Current Route
    // this.activeRoute  = state.url;
    // this.activeRoute = this.activeRoute.substring(1);
    // console.log( 'current route', this.activeRoute);
    //
    // this.menus = JSON.parse(localStorage.getItem('currentUser'));
    // this.subMenus = this.menus.role;
    // console.log( 'subMenus', this.subMenus);

    const currentUser = localStorage.getItem('auth_token');
    if (currentUser) {
      // logged in so return true


      // if (this.subMenus) {
      //   for (const mainMenu of this.subMenus.role_menus) {
      //     for (const mainMenuSecond of mainMenu.role_menu_sub_menus) {
      //       for (const menuItem of mainMenuSecond?.role_menu_sub_menu_screens) {
      //         if (menuItem.screen) {
      //           let urls = menuItem.screen.url;
      //
      //           if (urls.charAt(0) === '/') {
      //             urls = urls.substring(1);
      //           }
      //           if (urls === this.activeRoute) {
      //             console.log('URL :', urls);
      //             console.log('ROUTE', this.activeRoute);
      //             console.log('Matching');
      //             return true;
      //           }
      //           else {
      //             console.log('No');
      //             // this.router.navigate(['dashboard']);
      //           }
      //         }
      //       }
      //     }
      //   }
      //   this.router.navigate(['dashboard']);
      //   // $('#promissionsAlertModal').modal('show');
      // } else {
      //   this.router.navigate(['/dashboard']);
      // }


      return true;
    } else {
      this.authService.notAuthenticated();
      return false;
    }

  }
}
