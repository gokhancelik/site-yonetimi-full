import { Component, OnInit } from '@angular/core';
import { Kisi } from '../kisi.model';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { KisiService } from '../kisi.service';

@Component({
  selector: 'app-kisi-list',
  templateUrl: './kisi-list.component.html',
  styleUrls: ['./kisi-list.component.scss']
})
export class KisiListComponent extends BaseListComponent<Kisi> implements OnInit {
  columns: any[];
  constructor(service: KisiService) {
    super(service);
    this.columns = [{
      key: 'id',
      name: 'Id',
      type: 'string',
      visible: false,
      cellTemplate: 'detailLink',
      editorOptions: {
        readOnly: true,
        customParams: {
          detailKey: 'id',
          routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
        },
      },
    },
    {
      key: 'tcKimlikNo',
      name: 'TC Kimlik No',
      type: 'string',
      visible: true,
      cellTemplate: 'detailLink',
      editorOptions: {
        readOnly: true,
        customParams: {
          detailKey: 'id',
          routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
        },
      },
    },
    {
      key: 'ad',
      name: 'Ad',
      type: 'string',
      validators: [{
        type: 'required',
        message: 'Ad zorunludur',
      }],
      visible: true,
      cellTemplate: 'detailLink',
      editorOptions: {
        readOnly: true,
        customParams: {
          detailKey: 'id',
          routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
        },
      },
    },
    {
      key: 'soyad',
      name: 'Soyad',
      type: 'string',
      validators: [{
        type: 'required',
        message: 'Soyad zorunludur',
      }],
      visible: true,
      cellTemplate: 'detailLink',
      editorOptions: {
        readOnly: true,
        customParams: {
          detailKey: 'id',
          routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
        },
      },
    },
    {
      key: 'telefon',
      name: 'Telefon',
      type: 'string',
      visible: true,
    },
    {
      key: 'cepTelefon',
      name: 'Cep Telefon',
      type: 'string',
      visible: true,
    },
    {
      key: 'eposta',
      name: 'E-posta',
      type: 'string',
      visible: true,
    },
    {
      key: 'adres',
      name: 'Adres',
      type: 'string',
      visible: true,
    },
    ];
  }
}
