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
      editorOptions: { readOnly: true },
      visible: false,
    },
    {
      key: 'tcKimlikNo',
      name: 'TC Kimlik No',
      type: 'string',
      visible: true,
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
