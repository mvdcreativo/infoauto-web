import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { VenderComponent } from './web/admin/ventas/vender/vender.component';
import { Step1Component } from './web/admin/ventas/vender/steps/step1/step1.component';
import { Step2Component } from './web/admin/ventas/vender/steps/step2/step2.component';
import { Step3Component } from './web/admin/ventas/vender/steps/step3/step3.component';
import { Step4Component } from './web/admin/ventas/vender/steps/step4/step4.component';
import { Step5Component } from './web/admin/ventas/vender/steps/step5/step5.component';



const routes: Routes = [

  {
    path: 'mi-cuenta',
    loadChildren: () => import('./web/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },
  {
    path: 'vender',
    component: VenderComponent,
    canActivate:[AuthGuard],
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
  {
    path: '',
    loadChildren: () => import('./web/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    loadChildren: () => import('./web/pages/pages.module').then(m => m.PagesModule)
  },

  // {
  //   path : 'admin',
  //   loadChildren: './app-layout/app-layout.module#AppLayoutModule',
  //   canActivate: [AuthGuard]
  // },
  // { 
  //   path: '**', 
  //   redirectTo: '' 
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
