import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineIslemlerComponent } from './online-islemler.component';
import { OnlineIslemlerRoutingModule } from './online-islemler-routing.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';
import { DataTableModule } from '../../data-table/data-table.module';
import { OdemeComponent } from './odeme/odeme.component';
import { FormsModule } from '@angular/forms';
import { DxSelectBoxModule, DxTextBoxModule, DxValidatorModule, DxButtonModule } from 'devextreme-angular';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [OnlineIslemlerComponent, TahakkukListComponent, OdemeComponent],
  imports: [
    CommonModule,
    OnlineIslemlerRoutingModule,
    NgbTabsetModule,
    DataTableModule,
    FormsModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxButtonModule,
    PipesModule
  ]
})
export class OnlineIslemlerModule { }
