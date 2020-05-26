import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'tanimlamalar',
      loadChildren: () => import('./tanimlamalar/tanimlamalar.module')
        .then(m => m.TanimlamalarModule),
    },
    {
      path: 'islemler',
      loadChildren: () => import('./islemler/islemler.module')
        .then(m => m.IslemlerModule),
    },
    {
      path: 'sistem-ayarlari',
      loadChildren: () => import('./sistem-ayarlari/sistem-ayarlari.module')
        .then(m => m.SistemAyarlariModule),
    },
    {
      path: 'icerik-yonetimi',
      loadChildren: () => import('./icerik-yonetimi/icerik-yonetimi.module')
        .then(m => m.IcerikYonetimiModule),
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
