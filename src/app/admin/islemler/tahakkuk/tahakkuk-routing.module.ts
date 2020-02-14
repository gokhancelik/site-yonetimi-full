import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TahakkukComponent } from './tahakkuk.component';
import { TahakkukListComponent } from './tahakkuk-list/tahakkuk-list.component';


const routes: Routes = [
  {
    path: '',
    component: TahakkukComponent,
    children: [
      {
        path: 'list',
        component: TahakkukListComponent,
      },
      {
        path: ':id/detay',
        component: null
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TahakkukRoutingModule { }
