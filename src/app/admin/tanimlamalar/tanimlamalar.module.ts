import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TanimlamalarRoutingModule } from './tanimlamalar-routing.module';
import { BlokListComponent } from './blok/blok-list/blok-list.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { BlokComponent } from './blok/blok.component';
import { SiteComponent } from './site/site.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';


@NgModule({
  declarations: [BlokListComponent, SiteListComponent, BlokComponent, SiteComponent],
  imports: [
    CommonModule,
    TanimlamalarRoutingModule,
    DataTableModule
  ]
})
export class TanimlamalarModule { }
