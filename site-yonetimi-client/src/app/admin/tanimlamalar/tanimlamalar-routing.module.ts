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
import { KurulTipiComponent } from './kurul-tipi/kurul-tipi.component';
import { KurulTipiListComponent } from './kurul-tipi/kurul-tipi-list/kurul-tipi-list.component';

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
    path: 'kurul-tipi',
    component: KurulTipiComponent,
    children: [
      {
        path: 'list',
        component: KurulTipiListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TanimlamalarRoutingModule { }
