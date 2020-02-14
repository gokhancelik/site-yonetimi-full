import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: 'borc',
  loadChildren: () => import('./borc/borc.module')
    .then(m => m.BorcModule),
},
{
  path: 'tahakkuk',
  loadChildren: () => import('./tahakkuk/tahakkuk.module')
    .then(m => m.TahakkukModule),
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IslemlerRoutingModule { }
