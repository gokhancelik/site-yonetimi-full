import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NbAuthModule } from '@nebular/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-intercepter';
import { SifremiUnuttumComponent } from './sifremi-unuttum/sifremi-unuttum.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, SifremiUnuttumComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NgbAlertModule
  ],
  providers: []
})
export class AuthModule { }
