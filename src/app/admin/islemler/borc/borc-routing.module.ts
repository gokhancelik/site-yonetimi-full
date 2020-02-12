import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorcComponent } from './borc.component';
import { BorcListComponent } from './borc-list/borc-list.component';


const routes: Routes = [
    {
      path: '',
      component: BorcComponent,
      children: [
        {
          path: 'list',
          component: BorcListComponent,
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
export class BorcRoutingModule { }
