import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionesComponent } from './publicaciones/publicaciones.component';


const routes: Routes = [
    { 
        path: 'publicaciones',
        component: PublicacionesComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class VentasRoutingModule { }