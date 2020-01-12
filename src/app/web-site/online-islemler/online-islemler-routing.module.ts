import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineIslemlerComponent } from './online-islemler.component';
import { OdemeComponent } from './odeme/odeme.component';


const routes: Routes = [
  {
    path: '',
    component: OnlineIslemlerComponent,
  },
  {
    path: 'odeme',
    component: OdemeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineIslemlerRoutingModule { }
