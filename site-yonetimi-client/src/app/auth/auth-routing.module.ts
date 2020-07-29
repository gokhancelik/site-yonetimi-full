import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NbAuthComponent } from '@nebular/auth';
import { SifremiUnuttumComponent } from './sifremi-unuttum/sifremi-unuttum.component';


const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'sifremi-unuttum',
      component: SifremiUnuttumComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
