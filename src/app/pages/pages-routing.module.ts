import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path:'listado',
    loadChildren: ()=> import('./list/list.module').then(m => m.ListModule),
  },
  {
    path:'guia-de-precios',
    loadChildren: ()=> import('./price-guide/price-guide.module').then(m => m.PriceGuideModule),
  },
  {
    path: 'vehiculo/:id/:brand/:model/:year',
    loadChildren: ()=> import('./detalle/detalle.module').then(m => m.DetalleModule),
  },
  {
    path:'vender',
    loadChildren: ()=> import('./vender/vender.module').then(m => m.VenderModule),
  },
  {
    path:'mi-cuenta',
    loadChildren: ()=> import('./account/account.module').then(m => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
