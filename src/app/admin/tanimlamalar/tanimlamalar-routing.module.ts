import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { BlokComponent } from './blok/blok.component';
import { BlokListComponent } from './blok/blok-list/blok-list.component';
import { BagimsizBolumComponent } from './bagimsiz-bolum/bagimsiz-bolum.component';
import { BagimsizBolumListComponent } from './bagimsiz-bolum/bagimsiz-bolum-list/bagimsiz-bolum-list.component';
import { AidatGrubuComponent } from './aidat-grubu/aidat-grubu.component';
import { AidatGrubuListComponent } from './aidat-grubu/aidat-grubu-list/aidat-grubu-list.component';
import { HesapTanimiComponent } from './hesap-tanimi/hesap-tanimi.component';
import { HesapTanimiListComponent } from './hesap-tanimi/hesap-tanimi-list/hesap-tanimi-list.component';


const routes: Routes = [
  {
    path: 'site',
    component: SiteComponent,
    children: [
      {
        path: 'list',
        component: SiteListComponent
      }
    ]
  },
  {
    path: 'blok',
    component: BlokComponent,
    children: [
      {
        path: 'list',
        component: BlokListComponent
      }
    ]
  },
  {
    path: 'bagimsiz-bolum',
    component: BagimsizBolumComponent,
    children: [
      {
        path: 'list',
        component: BagimsizBolumListComponent
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
    path: 'hesap-tanimi',
    component: HesapTanimiComponent,
    children: [
      {
        path: 'list',
        component: HesapTanimiListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TanimlamalarRoutingModule { }
