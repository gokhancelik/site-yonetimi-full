import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSiteComponent } from './web-site.component';
import { WebSiteRoutingModule } from './web-site-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../auth/auth.module';
import { DataTableModule } from '../data-table/data-table.module';



@NgModule({
  declarations: [WebSiteComponent],
  imports: [
    CommonModule,
    WebSiteRoutingModule,
    NgbDropdownModule,
    AuthModule,
    DataTableModule
  ]
})
export class WebSiteModule { }
