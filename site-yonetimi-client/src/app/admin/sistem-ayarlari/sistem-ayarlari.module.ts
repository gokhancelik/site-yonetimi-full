import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemAyarlariRoutingModule } from './sistem-ayarlari-routing.module';
import { SanalPosListComponent } from './sanal-pos/sanal-pos-list/sanal-pos-list.component';
import { SanalPosComponent } from './sanal-pos/sanal-pos.component';
import { DataTableModule } from '../../data-table/data-table.module';
import { DxPopupModule, DxFormModule, DxDateBoxModule, DxSelectBoxModule, DxButtonModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DetayGorunumuModule } from '../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { MeskenTipiListComponent } from './mesken-tipi/mesken-tipi-list/mesken-tipi-list.component';
import { MeskenTipiComponent } from './mesken-tipi/mesken-tipi.component';


@NgModule({
  declarations: [SanalPosListComponent, SanalPosComponent, MeskenTipiListComponent, MeskenTipiComponent],
  imports: [
    CommonModule,
    DataTableModule,
    DxPopupModule,
    DxFormModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxValidatorModule,
    FormsModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule,
    SistemAyarlariRoutingModule
  ]
})
export class SistemAyarlariModule { }
