import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderService,
  SPINNER
} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#6c757d80',
  bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 60,
  bgsType: SPINNER.rectangleBounce,
  fgsColor: '#337AB7',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 60,
  fgsType: SPINNER.ballScaleMultiple,
  // logoUrl: 'assets/images/loder-red.gif',
  // pbColor: '#FF0000',
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgbModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [NgxUiLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
