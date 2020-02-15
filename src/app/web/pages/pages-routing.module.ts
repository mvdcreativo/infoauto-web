import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ResultsComponent } from './results/results.component';
import { DetalleComponent } from './detalle/detalle.component';
import { GuiaPreciosComponent } from './guia-precios/guia-precios.component';
import { ChartComponent } from './guia-precios/chart/chart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent 
    },
    {
      path: 'listado',
      component: ListComponent,
      children: [
        {
          path: '', 
          component: ResultsComponent 
        }
      ]
    },
    {
      path: 'vehiculo/:id/:brand/:model/:year',
      component: DetalleComponent
    },
    {
      path: 'guia-de-precios',
      component: GuiaPreciosComponent,
      children: [
        {
          path: 'estadistica', 
          component: ChartComponent 
        }
      ]
    },
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }