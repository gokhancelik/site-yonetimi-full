import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HesapHareketiComponent } from './hesap-hareketi.component';
import { HesapHareketiListComponent } from './hesap-hareketi-list/hesap-hareketi-list.component';
import { HesapHareketiYukleComponent } from './hesap-hareketi-yukle/hesap-hareketi-yukle.component';
import { IslenmemisHesapHareketiListComponent } from './islenmemis-hesap-hareketi-list/islenmemis-hesap-hareketi-list.component';


const routes: Routes = [
  {
    path: '',
    component: HesapHareketiComponent,
    children: [
      {
        path: 'list',
        component: HesapHareketiListComponent,
      },
      {
        path: ':id/detay',
        component: null
      },
      {
        path: 'hesap-hareketi-yukle',
        component: HesapHareketiYukleComponent
      },
      {
        path: 'islenmemisler',
        component: IslenmemisHesapHareketiListComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HesapHareketiRoutingModule { }
