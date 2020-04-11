import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebSiteComponent } from './web-site.component';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';


const routes: Routes = [
  {
    path: '',
    component: WebSiteComponent,
    children: [
      {
        path: 'online-islemler',
        loadChildren: () => import('./online-islemler/online-islemler.module').then(m => m.OnlineIslemlerModule),
        canActivate: [LoggedInGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebSiteRoutingModule { }
