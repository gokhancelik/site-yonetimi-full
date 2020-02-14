import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TahakkukRoutingModule } from './tahakkuk-routing.module';
import { TahakkukComponent } from './tahakkuk.component';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';


@NgModule({
  declarations: [TahakkukComponent, TahakkukListComponent],
  imports: [
    CommonModule,
    TahakkukRoutingModule, 
    DataTableModule
  ]
})
export class TahakkukModule { }
