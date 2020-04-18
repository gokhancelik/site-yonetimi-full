import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SanalPosComponent } from './sanal-pos/sanal-pos.component';
import { SanalPosListComponent } from './sanal-pos/sanal-pos-list/sanal-pos-list.component';


const routes: Routes = [{
  path: 'sanal-pos',
  component: SanalPosComponent,
  children: [
    {
      path: 'list',
      component: SanalPosListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemAyarlariRoutingModule { }
