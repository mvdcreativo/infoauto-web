import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SearcherComponent } from './components/searcher/searcher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ResReutilComponent } from './components/res-reutil/res-reutil.component';
import { CardsComponent } from './components/cards/cards.component';


@NgModule({
  declarations: [
    SearcherComponent,
    ResReutilComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    SearcherComponent,
    ResReutilComponent,
    CardsComponent
  ]
})
export class ProductsModule { }
