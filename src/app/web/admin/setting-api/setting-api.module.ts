import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingApiRoutingModule } from './setting-api-routing.module';
import { TipoVehicleComponent } from './tipo-vehicle/tipo-vehicle.component';
import { BrandsComponent } from './brands/brands.component';
import { ModelsComponent } from './models-vehicles/models.component';
import { SubmodelComponent } from './submodel/submodel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttributesComponent } from './attributes/attributes.component';
import { ExtrasComponent } from './extras/extras.component';


@NgModule({
  declarations: [
    TipoVehicleComponent, 
    BrandsComponent, 
    ModelsComponent, 
    SubmodelComponent, AttributesComponent, ExtrasComponent
  ],
  imports: [
    CommonModule,
    SettingApiRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SettingApiModule { }
