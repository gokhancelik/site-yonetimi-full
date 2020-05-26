import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebSiteComponent } from './web-site.component';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';


const routes: Routes = [
  {
    path: '',
    component: WebSiteComponent,
    children: [      
      {
        path: '',
        component: AnaSayfaComponent
      },
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
