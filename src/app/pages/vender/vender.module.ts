import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenderRoutingModule } from './vender-routing.module';
import { VenderComponent } from './vender.component';
import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step4Component } from './steps/step4/step4.component';
import { Step5Component } from './steps/step5/step5.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesDragDropComponent } from './steps/step3/images-drag-drop/images-drag-drop.component';
import { PublicacionesComponent } from 'src/app/modules/ventas/publicaciones/publicaciones.component';


@NgModule({
  declarations: [
    VenderComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    ImagesDragDropComponent,
    PublicacionesComponent,
  ],
  imports: [
    CommonModule,
    VenderRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AuthModule
  ]
})
export class VenderModule { }
