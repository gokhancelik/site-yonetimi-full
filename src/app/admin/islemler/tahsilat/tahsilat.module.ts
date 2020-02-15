import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TahsilatRoutingModule } from './tahsilat-routing.module';
import { TahsilatComponent } from './tahsilat.component';
import { TahsilatListComponent } from './tahsilat-list/tahsilat-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';

@NgModule({
  declarations: [TahsilatComponent, TahsilatListComponent],
  imports: [
    CommonModule,
    TahsilatRoutingModule,
    DataTableModule
  ]
})
export class TahsilatModule { }
