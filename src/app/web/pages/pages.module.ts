import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { PagesRoutingModule } from './pages-routing.module';
import { SearcherComponent } from '../searcher/searcher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CardsComponent } from '../cards/cards.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { ListComponent } from './list/list.component';
import { AccesosDirectosComponent } from './home/accesos-directos/accesos-directos.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DetalleGalleryComponent } from './detalle/gallery/detalle-gallery.component';
// import { NgxGalleryModule } from 'ngx-gallery';
import { ResReutilComponent } from '../res-reutil/res-reutil.component';
import { BrandModelPopularComponent } from '../brand-model-popular/brand-model-popular.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchInputComponent } from '../nav-bar/search-input/search-input.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GuiaPreciosComponent } from './guia-precios/guia-precios.component';
import { ChartComponent } from './guia-precios/chart/chart.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { GalleryModule } from  '@ngx-gallery/core';




export class FeatureRoutingModule {}

@NgModule({
  declarations: [
    HomeComponent,
    SearcherComponent,
    ResultsComponent,
    NotFoundComponent,
    NavBarComponent,
    SideNavComponent,
    CardsComponent,
    FilterBarComponent,
    ListComponent,
    AccesosDirectosComponent,
    DetalleComponent,
    DetalleGalleryComponent,
    ResReutilComponent,
    BrandModelPopularComponent,
    FooterComponent,
    SearchInputComponent,
    GuiaPreciosComponent,
    ChartComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    GalleryModule ,
    InfiniteScrollModule,
    AuthModule,    
  ],
  providers:[

  ]
})
export class PagesModule { }
