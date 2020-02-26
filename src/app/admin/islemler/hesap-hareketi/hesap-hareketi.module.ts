import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HesapHareketiRoutingModule } from './hesap-hareketi-routing.module';
import { HesapHareketiComponent } from './hesap-hareketi.component';
import { HesapHareketiListComponent } from './hesap-hareketi-list/hesap-hareketi-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DetayGorunumuModule } from '../../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HesapHareketiComponent, HesapHareketiListComponent],
  imports: [
    CommonModule,
    HesapHareketiRoutingModule,
    DataTableModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule
  ]
})
export class HesapHareketiModule { }
