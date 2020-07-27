import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebSiteComponent } from './web-site.component';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { MevzuatComponent } from './mevzuat/mevzuat.component';
import { BankaHesaplariComponent } from './banka-hesaplari/banka-hesaplari.component';
import { DilekOneriSikayetComponent } from './dilek-oneri-sikayet/dilek-oneri-sikayet.component';


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
        path: 'mevzuat',
        component: MevzuatComponent
      },
      {
        path: 'banka-hesaplari',
        component: BankaHesaplariComponent
      },
      {
        path: 'dilek-oneri-sikayet',
        component: DilekOneriSikayetComponent
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
