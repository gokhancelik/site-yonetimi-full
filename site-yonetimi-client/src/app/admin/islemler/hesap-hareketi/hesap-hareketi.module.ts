import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HesapHareketiRoutingModule } from './hesap-hareketi-routing.module';
import { HesapHareketiComponent } from './hesap-hareketi.component';
import { HesapHareketiListComponent } from './hesap-hareketi-list/hesap-hareketi-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DetayGorunumuModule } from '../../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule, NgbDatepickerModule, NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HesapHareketiYukleComponent } from './hesap-hareketi-yukle/hesap-hareketi-yukle.component';
import { HesaplarArasiTransferComponent } from './hesaplar-arasi-transfer/hesaplar-arasi-transfer.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule } from 'devextreme-angular';
import { IslenmemisHesapHareketiListComponent } from './islenmemis-hesap-hareketi-list/islenmemis-hesap-hareketi-list.component';
import { HesapHareketiIsleComponent } from './hesap-hareketi-isle/hesap-hareketi-isle.component';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';


@NgModule({
  declarations: [HesapHareketiComponent, HesapHareketiListComponent, HesapHareketiYukleComponent, HesaplarArasiTransferComponent, IslenmemisHesapHareketiListComponent, HesapHareketiIsleComponent],
  imports: [
    CommonModule,
    HesapHareketiRoutingModule,
    DataTableModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
    DxDataGridModule,
    TahakkukModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
  entryComponents: [HesaplarArasiTransferComponent],
  exports: [HesapHareketiListComponent]
})
export class HesapHareketiModule { }
