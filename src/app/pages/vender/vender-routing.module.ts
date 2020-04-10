import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenderComponent } from './vender.component';
import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step4Component } from './steps/step4/step4.component';
import { Step5Component } from './steps/step5/step5.component';


const routes: Routes = [
  {
    path: '',
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
      },
      {
        path: 'step5/:id',
        component: Step5Component
      },
      {
        path: 'step5',
        component: Step5Component
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenderRoutingModule { }
