import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ResultsComponent } from './results/results.component';
import { ProductsModule } from 'src/app/modules/products/products.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    ListComponent,
    FilterBarComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    LayoutModule,
    SharedModule,
    MaterialModule,
    ProductsModule,
    InfiniteScrollModule
  ]
})
export class ListModule { }
