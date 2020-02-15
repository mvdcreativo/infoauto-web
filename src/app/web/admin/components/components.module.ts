import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavAdminComponent } from './side-nav-admin/side-nav-admin.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideNavAdminComponent,
    NavBarAdminComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    SideNavAdminComponent,
    NavBarAdminComponent
  ]
})
export class ComponentsModule { }
