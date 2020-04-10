import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleRoutingModule } from './detalle-routing.module';
import { DetalleComponent } from './detalle.component';
import { DetalleGalleryComponent } from './gallery/detalle-gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { GalleryModule } from  '@ngx-gallery/core';
import { ProductsModule } from 'src/app/modules/products/products.module';
import { PriceGuideModule } from '../price-guide/price-guide.module';



@NgModule({
  declarations: [
    DetalleComponent,
    DetalleGalleryComponent
  ],
  imports: [
    CommonModule,
    DetalleRoutingModule,
    SharedModule,
    MaterialModule,
    GalleryModule,
    ProductsModule,
    PriceGuideModule
  ]
})
export class DetalleModule { }
