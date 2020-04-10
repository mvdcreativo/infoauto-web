import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [
      {
        path: '', 
        component: ResultsComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
