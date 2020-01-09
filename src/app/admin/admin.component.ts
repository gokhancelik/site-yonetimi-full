import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu: NbMenuItem[] = [
    {
      title: 'Tanımlamalar',
      icon: 'cog',
      children: [
        {
          title: 'Site',
          link: '/admin/tanimlamalar/site/list',
          icon: {
            icon: 'city',
          },
        },
        {
          title: 'Blok',
          link: '/admin/tanimlamalar/blok/list',
          icon: 'building'
        },
        {
          title: 'Bağımsız Bölüm',
          link: '/admin/tanimlamalar/bagimsiz-bolum/list',
          icon: 'home'
        },
        {
          title: 'Kişi',
          link: '/admin/tanimlamalar/kisi/list',
          icon: 'user'
        },
        {
          title: 'Aidat Grupları',
          link: '/admin/tanimlamalar/aidat-grubu/list',
          icon: 'tags'
        },
        {
          title: 'Faiz Grupları',
          link: '/admin/tanimlamalar/faiz-grubu/list',
          icon: 'percentage'
        },
        {
          title: 'Hesap Tanımları',
          link: '/admin/tanimlamalar/hesap-tanimi/list',
          icon: 'cash-register'
        },
      ]
    }
  ];


  ngOnInit() {
  }

}
