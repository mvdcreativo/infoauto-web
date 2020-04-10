import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { PublicacionesComponent } from 'src/app/modules/ventas/publicaciones/publicaciones.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children:[
      {
        path: 'publicaciones',
        component: PublicacionesComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
