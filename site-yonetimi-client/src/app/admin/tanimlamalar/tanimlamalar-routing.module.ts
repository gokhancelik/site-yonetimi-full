import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AidatGrubuComponent } from './aidat-grubu/aidat-grubu.component';
import { AidatGrubuListComponent } from './aidat-grubu/aidat-grubu-list/aidat-grubu-list.component';
import { HesapTanimiComponent } from './hesap-tanimi/hesap-tanimi.component';
import { HesapTanimiListComponent } from './hesap-tanimi/hesap-tanimi-list/hesap-tanimi-list.component';
import { KisiComponent } from './kisi/kisi.component';
import { KisiListComponent } from './kisi/kisi-list/kisi-list.component';
import { FaizGrubuComponent } from './faiz-grubu/faiz-grubu.component';
import { FaizGrubuListComponent } from './faiz-grubu/faiz-grubu-list/faiz-grubu-list.component';
import { GelirGiderTanimComponent } from './gelir-gider-tanim/gelir-gider-tanim.component';
import { GelirGiderTanimListComponent } from './gelir-gider-tanim/gelir-gider-tanim-list/gelir-gider-tanim-list.component';
import { KisiDetayComponent } from './kisi/kisi-detay/kisi-detay.component';
import { MeskenComponent } from './mesken/mesken.component';
import { MeskenListComponent } from './mesken/mesken-list/mesken-list.component';
import { MeskenDetayComponent } from './mesken/mesken-detay/mesken-detay.component';
import { PersonelComponent } from './personel/personel.component';
import { PersonelListComponent } from './personel/personel-list/personel-list.component';
import { KurulTipiComponent } from './kurul-tipi/kurul-tipi.component';
import { KurulTipiListComponent } from './kurul-tipi/kurul-tipi-list/kurul-tipi-list.component';
import { KurulUyeComponent } from './kurul-uye/kurul-uye.component';
import { KurulUyeListComponent } from './kurul-uye/kurul-uye-list/kurul-uye-list.component';

const routes: Routes = [
  {
    path: 'mesken',
    component: MeskenComponent,
    children: [
      {
        path: ':meskenTipi/list',
        component: MeskenListComponent
      },
      {
        path: ':id/detay',
        component: MeskenDetayComponent
      }
    ]
  },
  {
    path: 'kisi',
    component: KisiComponent,
    children: [
      {
        path: 'list',
        component: KisiListComponent
      },
      {
        path: ':id/detay',
        component: KisiDetayComponent
      }
    ]
  },
  {
    path: 'aidat-grubu',
    component: AidatGrubuComponent,
    children: [
      {
        path: 'list',
        component: AidatGrubuListComponent
      }
    ]
  },
  {
    path: 'faiz-grubu',
    component: FaizGrubuComponent,
    children: [
      {
        path: 'list',
        component: FaizGrubuListComponent
      }
    ]
  },
  {
    path: 'hesap-tanimi',
    component: HesapTanimiComponent,
    children: [
      {
        path: 'list',
        component: HesapTanimiListComponent
      }
    ]
  },
  {
    path: 'gelir-gider-tanimi',
    component: GelirGiderTanimComponent,
    children: [
      {
        path: 'list',
        component: GelirGiderTanimListComponent
      }
    ]
  },
  {
    path: 'personel',
    component: PersonelComponent,
    children: [
      {
        path: 'list',
        component: PersonelListComponent
      }
    ]
  },
  {
    path: 'kurul-tipi',
    component: KurulTipiComponent,
    children: [
      {
        path: 'list',
        component: KurulTipiListComponent
      }
    ]
  },
  {
    path: 'kurul-uye',
    component: KurulUyeComponent,
    children: [
      {
        path: 'list',
        component: KurulUyeListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TanimlamalarRoutingModule { }
