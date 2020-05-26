import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuyurularComponent } from './duyurular/duyurular.component';
import { DuyurularListComponent } from './duyurular/duyurular-list/duyurular-list.component';


const routes: Routes = [
  {
    path: 'duyurular',
    component: DuyurularComponent,
    children: [
      {
        path: 'list',
        component: DuyurularListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcerikYonetimiRoutingModule { }
