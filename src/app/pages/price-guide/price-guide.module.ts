import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceGuideRoutingModule } from './price-guide-routing.module';
import { GuiaPreciosComponent } from './guia-precios.component';
import { ChartComponent } from './chart/chart.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GuiaPreciosComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    PriceGuideRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  exports:[
    ChartComponent
  ]
})
export class PriceGuideModule { }
