import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TahakkukRoutingModule } from './tahakkuk-routing.module';
import { TahakkukComponent } from './tahakkuk.component';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DetayGorunumuModule } from '../../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TahakkukComponent, TahakkukListComponent],
  imports: [
    CommonModule,
    TahakkukRoutingModule, 
    DataTableModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule
  ]
})
export class TahakkukModule { }
