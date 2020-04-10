import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandModelPopularComponent } from './brand-model-popular/brand-model-popular.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    BrandModelPopularComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    BrandModelPopularComponent
  ]
})
export class BrandsModule { }
