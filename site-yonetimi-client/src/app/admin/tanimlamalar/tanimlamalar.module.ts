import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TanimlamalarRoutingModule } from './tanimlamalar-routing.module';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { AidatGrubuComponent } from './aidat-grubu/aidat-grubu.component';
import { AidatGrubuListComponent } from './aidat-grubu/aidat-grubu-list/aidat-grubu-list.component';
import { DxPopupModule, DxFormModule, DxDateBoxModule, DxSelectBoxModule, DxButtonModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { HesapTanimiComponent } from './hesap-tanimi/hesap-tanimi.component';
import { HesapTanimiListComponent } from './hesap-tanimi/hesap-tanimi-list/hesap-tanimi-list.component';
import { KisiComponent } from './kisi/kisi.component';
import { KisiListComponent } from './kisi/kisi-list/kisi-list.component';
import { FaizGrubuComponent } from './faiz-grubu/faiz-grubu.component';
import { FaizGrubuListComponent } from './faiz-grubu/faiz-grubu-list/faiz-grubu-list.component';
import { GelirGiderTanimComponent } from './gelir-gider-tanim/gelir-gider-tanim.component';
import { GelirGiderTanimListComponent } from './gelir-gider-tanim/gelir-gider-tanim-list/gelir-gider-tanim-list.component';
import { KisiDetayComponent } from './kisi/kisi-detay/kisi-detay.component';
import { DetayGorunumuModule } from '../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { MeskenComponent } from './mesken/mesken.component';
import { MeskenListComponent } from './mesken/mesken-list/mesken-list.component';
import { MeskenKisiListComponent } from './mesken-kisi/mesken-kisi-list/mesken-kisi-list.component';
import { MeskenDetayComponent } from './mesken/mesken-detay/mesken-detay.component';
import { OdenmemisTahakkukListComponent } from './tahakkuk/odenmemis-tahakkuk-list/odenmemis-tahakkuk-list.component';
import { OdenmisTahakkukListComponent } from './tahakkuk/odenmis-tahakkuk-list/odenmis-tahakkuk-list.component';
import { TahsilatListComponent } from './tahsilat/tahsilat-list/tahsilat-list.component';
import { PersonelComponent } from './personel/personel.component';
import { PersonelListComponent } from './personel/personel-list/personel-list.component';


@NgModule({
  declarations: [ AidatGrubuComponent, AidatGrubuListComponent,
    MeskenComponent,MeskenListComponent, MeskenKisiListComponent, MeskenDetayComponent,
    HesapTanimiComponent, HesapTanimiListComponent, KisiComponent, KisiListComponent,
    FaizGrubuComponent, FaizGrubuListComponent, GelirGiderTanimComponent, GelirGiderTanimListComponent,KisiDetayComponent, OdenmemisTahakkukListComponent, OdenmisTahakkukListComponent, TahsilatListComponent, PersonelComponent, PersonelListComponent, 
    ],
  imports: [
    CommonModule,
    TanimlamalarRoutingModule,
    DataTableModule,
    DxPopupModule,
    DxFormModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxValidatorModule,
    FormsModule,
    DetayGorunumuModule,
    NbCardModule,
    NgbTabsetModule
  ]
})
export class TanimlamalarModule { }
