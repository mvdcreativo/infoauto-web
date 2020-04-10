import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuiaPreciosComponent } from './guia-precios.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  {
    path: '',
    component: GuiaPreciosComponent,
    children: [
      {
        path: 'estadistica', 
        component: ChartComponent 
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceGuideRoutingModule { }
