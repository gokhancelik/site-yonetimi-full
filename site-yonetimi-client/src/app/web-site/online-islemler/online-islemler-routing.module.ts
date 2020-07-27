import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineIslemlerComponent } from './online-islemler.component';
import { OdemeComponent } from './odeme/odeme.component';
import { OdemeSonucuComponent } from './odeme-sonucu/odeme-sonucu.component';


const routes: Routes = [
  {
    path: '',
    component: OnlineIslemlerComponent,
  },
  {
    path: 'odeme/:id',
    component: OdemeComponent
  },
  {
    path: 'odeme-sonucu/:durum',
    component: OdemeSonucuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineIslemlerRoutingModule { }
