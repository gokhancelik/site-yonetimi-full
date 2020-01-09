import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineIslemlerComponent } from './online-islemler.component';
import { OnlineIslemlerRoutingModule } from './online-islemler-routing.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';



@NgModule({
  declarations: [OnlineIslemlerComponent, TahakkukListComponent],
  imports: [
    CommonModule,
    OnlineIslemlerRoutingModule,
    NgbTabsetModule,
  ]
})
export class OnlineIslemlerModule { }
