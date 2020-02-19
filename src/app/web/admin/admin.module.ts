import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { VentasModule } from './ventas/ventas.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavBarAdminComponent } from './components/nav-bar-admin/nav-bar-admin.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    VentasModule,
    DashboardModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AdminModule { }
