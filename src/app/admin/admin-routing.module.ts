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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
