import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcerikYonetimiRoutingModule } from './icerik-yonetimi-routing.module';
import { DuyurularComponent } from './duyurular/duyurular.component';
import { DuyurularListComponent } from './duyurular/duyurular-list/duyurular-list.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { DxPopupModule, DxFormModule, DxValidatorModule, DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { DetayGorunumuModule } from 'src/app/detay-gorunumu/detay-gorunumu.module';


@NgModule({
  declarations: [DuyurularComponent, DuyurularListComponent],
  imports: [
    CommonModule,
    IcerikYonetimiRoutingModule,
    DataTableModule,
    DxPopupModule,
    DxFormModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxValidatorModule,
    FormsModule,
    DetayGorunumuModule,
    NbCardModule,
  ]
})
export class IcerikYonetimiModule { }
