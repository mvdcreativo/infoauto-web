import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenderComponent } from './vender/vender.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { Step1Component } from './vender/steps/step1/step1.component';
import { Step2Component } from './vender/steps/step2/step2.component';
import { Step3Component } from './vender/steps/step3/step3.component';
import { Step4Component } from './vender/steps/step4/step4.component';

const routes: Routes = [
    { 
        path: '',
        component: VenderComponent,
    },
    { 
        path: 'vender',
        component: VenderComponent,
        children: [
            {
                path: 'step1/:id',
                component: Step1Component
            },
            {
                path: 'step1',
                component: Step1Component
            },
            {
                path: 'step2/:id',
                component: Step2Component
            },
            {
                path: 'step2',
                component: Step2Component
            },
            {
                path: 'step3/:id',
                component: Step3Component
            },
            {
                path: 'step3',
                component: Step3Component
            },
            {
                path: 'step4/:id',
                component: Step4Component 
            },
            {
                path: 'step4',
                component: Step4Component 
            }
        ]
    },
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