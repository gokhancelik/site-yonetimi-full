import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorcRoutingModule } from './borc-routing.module';
import { BorcListComponent } from './borc-list/borc-list.component';
import { BorcComponent } from './borc.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DxPopupModule, DxDateBoxModule, DxSelectBoxModule, DxButtonModule, DxValidatorModule, DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';


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
    FormsModule,
    DxTextBoxModule
  ]
})
export class BorcModule { }
