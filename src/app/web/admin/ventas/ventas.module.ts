import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenderComponent } from './vender/vender.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VentasRoutingModule } from './ventas-routing.module';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { Step1Component } from './vender/steps/step1/step1.component';
import { Step2Component } from './vender/steps/step2/step2.component';
import { Step3Component } from './vender/steps/step3/step3.component';
import { Step4Component } from './vender/steps/step4/step4.component';
import { ImagesDragDropComponent } from './vender/steps/step3/images-drag-drop/images-drag-drop.component';
import { DialogVenderComponent } from './vender/dialog-vender/dialog-vender.component';
import { Step5Component } from './vender/steps/step5/step5.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    VenderComponent,
    PublicacionesComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    ImagesDragDropComponent,
    DialogVenderComponent,
    
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    ComponentsModule,
  ]
})
export class VentasModule { }
