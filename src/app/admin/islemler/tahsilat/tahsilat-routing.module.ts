import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TahsilatComponent } from './tahsilat.component';
import { TahsilatListComponent } from './tahsilat-list/tahsilat-list.component';
import { TahsilatDetayComponent } from './tahsilat-detay/tahsilat-detay.component';


const routes: Routes = [
  {
    path: '',
    component: TahsilatComponent,
    children: [
      {
        path: 'list',
        component: TahsilatListComponent,
      },
      {
        path: ':id/detay',
        component: TahsilatDetayComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TahsilatRoutingModule { }
