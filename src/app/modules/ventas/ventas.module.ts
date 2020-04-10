import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    PublicacionesComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
    // MaterialModule,
  ]
})
export class VentasModule { } 