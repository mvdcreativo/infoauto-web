import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoVehicleComponent } from './tipo-vehicle/tipo-vehicle.component';
import { ModelsComponent } from './models-vehicles/models.component';
import { BrandsComponent } from './brands/brands.component';
import { SubmodelComponent } from './submodel/submodel.component';
import { AttributesComponent } from './attributes/attributes.component';
import { ExtrasComponent } from './extras/extras.component';


const routes: Routes = [
  {
    path: 'tipo-vehiculo',
    component: TipoVehicleComponent
  },
  {
    path: 'marcas',
    component: BrandsComponent
  },
  {
    path: 'modelos',
    component: ModelsComponent
  },
  {
    path: 'sub-modelos',
    component: SubmodelComponent
  },
  {
    path: 'atributos',
    component: AttributesComponent
  },
  {
    path: 'extras',
    component: ExtrasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingApiRoutingModule { }
