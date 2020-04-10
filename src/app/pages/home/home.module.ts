import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProductsModule } from 'src/app/modules/products/products.module';
import { AccesosDirectosComponent } from './accesos-directos/accesos-directos.component';
import { BrandsModule } from 'src/app/modules/brands/brands.module';


@NgModule({
  declarations: [
    HomeComponent,
    AccesosDirectosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    ProductsModule,
    BrandsModule
  ]
})
export class HomeModule { }
