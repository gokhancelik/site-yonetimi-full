import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TahakkukRoutingModule } from './tahakkuk-routing.module';
import { TahakkukComponent } from './tahakkuk.component';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DetayGorunumuModule } from '../../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule, NgbDatepickerModule, NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DxPopupModule, DxDateBoxModule, DxSelectBoxModule, DxButtonModule, DxValidatorModule, DxTextBoxModule, DxNumberBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { TahakkukOdeComponent } from './tahakkuk-ode/tahakkuk-ode.component';


@NgModule({
  declarations: [TahakkukComponent, TahakkukListComponent, TahakkukOdeComponent],
  imports: [
    CommonModule,
    TahakkukRoutingModule,
    DataTableModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule,
    DxPopupModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxTextBoxModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule
  ],
  exports:[TahakkukOdeComponent],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})
export class TahakkukModule { }
