import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorcRoutingModule } from './borc-routing.module';
import { BorcListComponent } from './borc-list/borc-list.component';
import { BorcComponent } from './borc.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DxPopupModule, DxDateBoxModule, DxSelectBoxModule, DxButtonModule, DxValidatorModule, DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DetayGorunumuModule } from '../../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [BorcListComponent, BorcComponent],
  imports: [
    CommonModule,
    BorcRoutingModule,
    DataTableModule,
    DxPopupModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxTextBoxModule,
    FormsModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule
  ],
  exports: [BorcListComponent]
})
export class BorcModule { }
