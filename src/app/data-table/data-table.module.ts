import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxHtmlEditorModule } from 'devextreme-angular';
import { DataTableComponent } from './data-table.component';
import { NbCardModule } from '@nebular/theme';
import { DetailLinkComponent } from './detail-link/detail-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DataTableComponent, DetailLinkComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    NbCardModule,
    RouterModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
