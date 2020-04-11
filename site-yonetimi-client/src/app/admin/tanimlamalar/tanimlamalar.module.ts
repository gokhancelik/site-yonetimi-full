import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TanimlamalarRoutingModule } from './tanimlamalar-routing.module';
import { BlokListComponent } from './blok/blok-list/blok-list.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { BlokComponent } from './blok/blok.component';
import { SiteComponent } from './site/site.component';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { BagimsizBolumComponent } from './bagimsiz-bolum/bagimsiz-bolum.component';
import { BagimsizBolumListComponent } from './bagimsiz-bolum/bagimsiz-bolum-list/bagimsiz-bolum-list.component';
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
import { BagimsizBolumDetayComponent } from './bagimsiz-bolum/bagimsiz-bolum-detay/bagimsiz-bolum-detay.component';
import { BlokDetayComponent } from './blok/blok-detay/blok-detay.component';
import { KisiDetayComponent } from './kisi/kisi-detay/kisi-detay.component';
import { SiteDetayComponent } from './site/site-detay/site-detay.component';
import { BagimsizBolumKisiListComponent } from './bagimsiz-bolum-kisi/bagimsiz-bolum-kisi-list/bagimsiz-bolum-kisi-list.component';
import { DetayGorunumuModule } from '../../detay-gorunumu/detay-gorunumu.module';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [BlokListComponent, SiteListComponent, BlokComponent, SiteComponent, BagimsizBolumComponent,
    BagimsizBolumListComponent, AidatGrubuComponent, AidatGrubuListComponent,
    HesapTanimiComponent, HesapTanimiListComponent, KisiComponent, KisiListComponent,
    FaizGrubuComponent, FaizGrubuListComponent, GelirGiderTanimComponent, GelirGiderTanimListComponent,
    BagimsizBolumDetayComponent, BlokDetayComponent, KisiDetayComponent, SiteDetayComponent,
    BagimsizBolumKisiListComponent],
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
