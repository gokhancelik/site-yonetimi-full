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
        {
          title: 'Gelir-Gider Tanımları',
          link: '/admin/tanimlamalar/gelir-gider-tanimi/list',
          icon: 'receipt'
        },
      ]
    },
    {
      title: 'İşlemler',
      icon: 'book',
      children: [
        {
          title: 'Borc',
          link: '/admin/islemler/borc/list',
          icon: {
            icon: 'file-invoice',
          },
        },
        {
          title: 'Tahakkuk',
          link: '/admin/islemler/tahakkuk/list',
          icon: {
            icon: 'money-check',
          },
        },
        {
          title: 'Tahsilat',
          link: '/admin/islemler/tahsilat/list',
          icon: {
            icon: 'credit-card',
          },
        },
        {
          title: 'Hesap Hareketi',
          link: '/admin/islemler/hesap-hareketi/list',
          icon: {
            icon: 'exchange-alt',
          },
        },
      ]
    }
  ];
  constructor(
    private iconLibraries: NbIconLibraries) {

    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('font-awesome-5', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome-5');
  }

  ngOnInit() {
  }

}
