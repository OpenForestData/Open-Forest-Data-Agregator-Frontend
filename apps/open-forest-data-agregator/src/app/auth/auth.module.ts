import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgottPasswordComponent } from './forgott-password/forgott-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

const components = [LoginComponent, RegisterComponent, ForgottPasswordComponent, ResetPasswordComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, AuthRoutingModule, SharedModule, FormsModule]
})
export class AuthModule {}
