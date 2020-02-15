import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from './material/material.module';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ReactiveFormsModule } from '@angular/forms';



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
    ReactiveFormsModule
    
  ],
  exports:[
    SimplebarAngularModule,
    ChartsModule,
    MaterialModule,
    CheckboxGroupComponent

  ]
})
export class SharedModule { }
