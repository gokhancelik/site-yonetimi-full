import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorcRoutingModule } from './borc-routing.module';
import { BorcListComponent } from './borc-list/borc-list.component';
import { BorcComponent } from './borc.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';


@NgModule({
  declarations: [BorcListComponent, BorcComponent],
  imports: [
    CommonModule,
    BorcRoutingModule,
    DataTableModule
  ]
})
export class BorcModule { }
