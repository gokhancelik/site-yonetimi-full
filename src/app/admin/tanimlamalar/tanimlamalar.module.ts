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


@NgModule({
  declarations: [BlokListComponent, SiteListComponent, BlokComponent, SiteComponent, BagimsizBolumComponent, BagimsizBolumListComponent, AidatGrubuComponent, AidatGrubuListComponent, HesapTanimiComponent, HesapTanimiListComponent, KisiComponent, KisiListComponent, FaizGrubuComponent, FaizGrubuListComponent],
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
    FormsModule
  ]
})
export class TanimlamalarModule { }
