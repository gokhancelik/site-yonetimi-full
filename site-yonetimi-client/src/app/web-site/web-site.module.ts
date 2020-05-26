import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSiteComponent } from './web-site.component';
import { WebSiteRoutingModule } from './web-site-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../auth/auth.module';
import { DataTableModule } from '../data-table/data-table.module';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { DuyurularComponent } from './ana-sayfa/duyurular/duyurular.component';



@NgModule({
  declarations: [WebSiteComponent, AnaSayfaComponent, DuyurularComponent],
  imports: [
    CommonModule,
    WebSiteRoutingModule,
    NgbDropdownModule,
    AuthModule,
    DataTableModule
  ]
})
export class WebSiteModule { }
