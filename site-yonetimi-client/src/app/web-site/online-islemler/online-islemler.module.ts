import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineIslemlerComponent } from './online-islemler.component';
import { OnlineIslemlerRoutingModule } from './online-islemler-routing.module';
import { NgbTabsetModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';
import { DataTableModule } from '../../data-table/data-table.module';
import { OdemeComponent, RunScriptsDirective } from './odeme/odeme.component';
import { FormsModule } from '@angular/forms';
import { DxSelectBoxModule, DxTextBoxModule, DxValidatorModule, DxButtonModule } from 'devextreme-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { OdemeGatewayComponent } from './odeme-gateway/odeme-gateway.component';
import { OdenmisTahakkuklarComponent } from './odenmis-tahakkuklar/odenmis-tahakkuklar.component';
import { TahsilatListComponent } from './tahsilat-list/tahsilat-list.component';



@NgModule({
  declarations: [OnlineIslemlerComponent, TahakkukListComponent, OdemeComponent, OdemeGatewayComponent,RunScriptsDirective, OdenmisTahakkuklarComponent, TahsilatListComponent],
  imports: [
    CommonModule,
    OnlineIslemlerRoutingModule,
    NgbTabsetModule,
    NgbModalModule,
    DataTableModule,
    FormsModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxButtonModule,
    PipesModule
  ],
  entryComponents: [
    OdemeGatewayComponent
  ]
})
export class OnlineIslemlerModule { }
