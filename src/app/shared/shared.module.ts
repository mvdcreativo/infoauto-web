import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from './material/material.module';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



@NgModule({
  declarations: [
    SnackBarComponent,
    CheckboxGroupComponent
  ],
  imports: [
    CommonModule,
    SimplebarAngularModule,
    ChartsModule,
    MaterialModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
    
  ],
  exports:[
    SimplebarAngularModule,
    ChartsModule,
    MaterialModule,
    CheckboxGroupComponent,
    PerfectScrollbarModule

  ]
})
export class SharedModule { }
