import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineIslemlerComponent } from './online-islemler.component';


const routes: Routes = [
  {
    path: '',
    component: OnlineIslemlerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineIslemlerRoutingModule { }
