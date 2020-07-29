import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { AuthInterceptor } from './auth/interceptors/auth-intercepter';
// import { AuthModule } from './auth/auth.module';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import localeTrExtra from '@angular/common/locales/extra/tr';
// import { NbEvaIconsModule } from '@nebular/eva-icons';

registerLocaleData(localeTr, localeTrExtra);
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
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    // NbEvaIconsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: LOCALE_ID, useValue: 'tr-TR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
