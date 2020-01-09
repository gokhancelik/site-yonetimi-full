import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebSiteComponent } from './web-site.component';


const routes: Routes = [
  {
    path: '',
    component: WebSiteComponent,
    children: [
      {
        path: 'online-islemler',
        loadChildren: () => import('./online-islemler/online-islemler.module').then(m => m.OnlineIslemlerModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebSiteRoutingModule { }
