import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IslemlerRoutingModule } from './islemler-routing.module';
import { DetayGorunumuModule } from '../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IslemlerRoutingModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule
  ]
})
export class IslemlerModule { }
