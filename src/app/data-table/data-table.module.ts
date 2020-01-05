import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxHtmlEditorModule } from 'devextreme-angular';
import { DataTableComponent } from './data-table.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    NbCardModule,
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
