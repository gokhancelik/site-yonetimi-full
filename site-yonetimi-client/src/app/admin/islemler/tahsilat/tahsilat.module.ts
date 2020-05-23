import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TahsilatRoutingModule } from './tahsilat-routing.module';
import { TahsilatComponent } from './tahsilat.component';
import { TahsilatListComponent } from './tahsilat-list/tahsilat-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { TahsilatDetayComponent } from './tahsilat-detay/tahsilat-detay.component';
import { DetayGorunumuModule } from '../../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TahsilatKalemListComponent } from './tahsilat-kalem-list/tahsilat-kalem-list.component';
import { DxPopupModule, DxDateBoxModule, DxSelectBoxModule, DxButtonModule, DxValidatorModule, DxTextBoxModule } from 'devextreme-angular';
import { TahsilatYukleComponent } from './tahsilat-yukle/tahsilat-yukle.component';

@NgModule({
  declarations: [TahsilatComponent, TahsilatListComponent, TahsilatDetayComponent, TahsilatKalemListComponent, TahsilatYukleComponent],
  imports: [
    CommonModule,
    TahsilatRoutingModule,
    DataTableModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule,
    DxPopupModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxTextBoxModule,
  ]
})
export class TahsilatModule { }
