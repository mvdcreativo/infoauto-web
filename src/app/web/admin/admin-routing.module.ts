import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('./ventas/ventas.module').then(m => m.VentasModule)
      },
      {
        path: 'settings-api',
        loadChildren: () =>
          import('./setting-api/setting-api.module').then(m => m.SettingApiModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule {}
