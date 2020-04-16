import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './compare.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    CompareComponent
  ],
  imports: [
    CommonModule,
    CompareRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class CompareModule { }
