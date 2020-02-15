import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { indexAuthInterceptor } from './auth/helpers/index-auth.interceptor';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [indexAuthInterceptor],
  entryComponents: [
    SnackBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

