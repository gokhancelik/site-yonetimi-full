import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSiteComponent } from './web-site.component';
import { WebSiteRoutingModule } from './web-site-routing.module';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../auth/auth.module';
import { DataTableModule } from '../data-table/data-table.module';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { DuyurularComponent } from './ana-sayfa/duyurular/duyurular.component';
import { MevzuatComponent } from './mevzuat/mevzuat.component';
import { BankaHesaplariComponent } from './banka-hesaplari/banka-hesaplari.component';
import { PipesModule } from '../pipes/pipes.module';
import { DilekOneriSikayetComponent } from './dilek-oneri-sikayet/dilek-oneri-sikayet.component';
@NgModule({
  declarations: [WebSiteComponent, AnaSayfaComponent, DuyurularComponent, MevzuatComponent, BankaHesaplariComponent, DilekOneriSikayetComponent],
  imports: [
    CommonModule,
    WebSiteRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    AuthModule,
    DataTableModule,
    PipesModule
  ]
})
export class WebSiteModule { }
