import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { UserActionsComponent } from '../auth/user-actions/user-actions.component';
import { AuthModule } from '../auth/auth.module';
import { CarouselHomeComponent } from './components/carousel-home/carousel-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { SearchInputComponent } from './components/header/search-input/search-input.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';



@NgModule({
  declarations: [
    SnackBarComponent,
    HeaderComponent,
    CarouselHomeComponent,
    FooterComponent,
    SearchInputComponent,
    CheckboxGroupComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule,
    MaterialModule,
    PerfectScrollbarModule,

   ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CarouselHomeComponent,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule,
    CheckboxGroupComponent,
    PerfectScrollbarModule,
  ]
})
export class SharedModule { }
