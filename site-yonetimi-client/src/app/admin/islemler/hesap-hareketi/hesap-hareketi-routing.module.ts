import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HesapHareketiComponent } from './hesap-hareketi.component';
import { HesapHareketiListComponent } from './hesap-hareketi-list/hesap-hareketi-list.component';
import { HesapHareketiYukleComponent } from './hesap-hareketi-yukle/hesap-hareketi-yukle.component';


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
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HesapHareketiRoutingModule { }
