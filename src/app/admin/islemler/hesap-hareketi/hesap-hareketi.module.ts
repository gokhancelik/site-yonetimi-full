import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HesapHareketiRoutingModule } from './hesap-hareketi-routing.module';
import { HesapHareketiComponent } from './hesap-hareketi.component';
import { HesapHareketiListComponent } from './hesap-hareketi-list/hesap-hareketi-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';


@NgModule({
  declarations: [HesapHareketiComponent, HesapHareketiListComponent],
  imports: [
    CommonModule,
    HesapHareketiRoutingModule,
    DataTableModule
  ]
})
export class HesapHareketiModule { }
