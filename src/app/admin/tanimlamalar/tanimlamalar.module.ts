import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TanimlamalarRoutingModule } from './tanimlamalar-routing.module';
import { BlokListComponent } from './blok/blok-list/blok-list.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { BlokComponent } from './blok/blok.component';
import { SiteComponent } from './site/site.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { BagimsizBolumComponent } from './bagimsiz-bolum/bagimsiz-bolum.component';
import { BagimsizBolumListComponent } from './bagimsiz-bolum/bagimsiz-bolum-list/bagimsiz-bolum-list.component';


@NgModule({
  declarations: [BlokListComponent, SiteListComponent, BlokComponent, SiteComponent, BagimsizBolumComponent, BagimsizBolumListComponent],
  imports: [
    CommonModule,
    TanimlamalarRoutingModule,
    DataTableModule
  ]
})
export class TanimlamalarModule { }
