import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSiteComponent } from './web-site.component';
import { WebSiteRoutingModule } from './web-site-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../auth/auth.module';
import { DataTableModule } from '../data-table/data-table.module';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { DuyurularComponent } from './ana-sayfa/duyurular/duyurular.component';
import { MevzuatComponent } from './mevzuat/mevzuat.component';
import { BankaHesaplariComponent } from './banka-hesaplari/banka-hesaplari.component';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';

import { ErrorMessage } from "ng-bootstrap-form-validation";

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: "required",
    format: requiredFormat
  }, {
    error: "email",
    format: emailFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} zorunludur`;
}

export function emailFormat(label: string, error: any): string {
  return `${label} geçerli değil.`;
}
@NgModule({
  declarations: [WebSiteComponent, AnaSayfaComponent, DuyurularComponent, MevzuatComponent, BankaHesaplariComponent],
  imports: [
    CommonModule,
    WebSiteRoutingModule,
    NgbDropdownModule,
    AuthModule,
    DataTableModule
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    }
  ]
})
export class WebSiteModule { }
