import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'username',
          token: {
            class: NbAuthJWTToken,
            key: 'access_token'
          },
          baseEndpoint: environment.apiUrl,
          login: {
            endpoint: '/auth/login',
          },
          register: {
            endpoint: '/auth/register',
          },
        }),
      ],
      forms: {},
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
