import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbIconLibraries } from '@nebular/theme';
import { MeskenTipiService } from './sistem-ayarlari/mesken-tipi/mesken-tipi.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  /**
   *
   */

  menu: NbMenuItem[] = [
    {
      title: 'Sistem Ayarları',
      icon: 'tools',
      children: [
        {
          title: 'Sanal Pos',
          link: '/admin/sistem-ayarlari/sanal-pos/list',
          icon: {
            icon: '',
          },
        }
      ]
    },
    {
      title: 'İçerik Yönetimi',
      icon: 'file-alt',
      children: [
        {
          title: 'Duyurular',
          link: '/admin/icerik-yonetimi/duyurular/list',
          icon: {
            icon: '',
          },
        }
      ]
    },
    {
      title: 'Tanımlamalar',
      icon: 'cog',
      children: [

        {
          title: 'Site',
          link: '/admin/tanimlamalar/mesken/site/list',
          icon: {
            icon: 'city',
          },
        },
        {
          title: 'Blok',
          link: '/admin/tanimlamalar/mesken/blok/list',
          icon: 'building'
        },
        {
          title: 'Bağımsız Bölüm',
          link: '/admin/tanimlamalar/mesken/bagimsiz-bolum/list',
          icon: 'home'
        },
        {
          title: 'Kişi',
          link: '/admin/tanimlamalar/kisi/list',
          icon: 'user'
        },
        {
          title: 'Personel',
          link: '/admin/tanimlamalar/personel/list',
          icon: 'user-tag'
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
        {
          title: 'Kurul Tipi',
          link: '/admin/tanimlamalar/kurul-tipi/list',
          icon: 'user'
        },
        {
          title: 'Kurul Uye',
          link: '/admin/tanimlamalar/kurul-uye/list',
          icon: 'user-tie'
        },
        {
          title: 'Kurul Uye Tipi',
          link: '/admin/tanimlamalar/kurul-uye-tipi/list',
          icon: 'users'
        },
        {
          title: 'Firma',
          link: '/admin/tanimlamalar/firma/list',
          icon: 'building'
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
        {
          title: 'İşlenmemiş Hesap Hareketleri',
          link: '/admin/islemler/hesap-hareketi/islenmemisler',
          icon: {
            icon: 'exchange-alt',
          },
        }
      ]
    }
  ];
  constructor(
    private meskenTipiService: MeskenTipiService,
    private iconLibraries: NbIconLibraries) {

    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('font-awesome-5', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome-5');
  }
  ngOnInit() {
  }

}
