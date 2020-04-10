import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ModalAuthComponent } from './modal-auth/modal-auth.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserActionsComponent,
    ModalAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    UserActionsComponent
  ],
  entryComponents: [
    ModalAuthComponent
  ]
})
export class AuthModule { }
