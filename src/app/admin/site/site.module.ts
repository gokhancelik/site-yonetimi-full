import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteListComponent } from './site-list/site-list.component';
import { DataTableModule } from '../../data-table/data-table.module';


@NgModule({
  declarations: [SiteListComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    DataTableModule
  ]
})
export class SiteModule { }
