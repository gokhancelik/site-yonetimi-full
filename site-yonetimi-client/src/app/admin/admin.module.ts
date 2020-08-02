import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import {
  NbThemeModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbIconModule,
  NbActionsModule, NbSearchModule, NbUserModule, NbContextMenuModule
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AdminComponent, HeaderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule,
    HttpClientModule
  ]
})
export class AdminModule { }
