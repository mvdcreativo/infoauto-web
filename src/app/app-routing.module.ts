import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';


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
