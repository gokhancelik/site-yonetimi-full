import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahakkukModel } from '../tahakkuk-model';
import { GelirGiderTanimService } from 'src/app/admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { BagimsizBolumKisiService } from 'src/app/admin/tanimlamalar/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';
import { TahakkukService } from '../tahakkuk-service';
import { of } from 'rxjs';
import { KisiService } from 'src/app/admin/tanimlamalar/kisi/kisi.service';

@Component({
  selector: 'app-tahakkuk-list',
  templateUrl: './tahakkuk-list.component.html',
  styleUrls: ['./tahakkuk-list.component.scss']
})
export class TahakkukListComponent extends BaseListComponent<TahakkukModel> implements OnInit {
  columns: any[];
  aidatDurumulari = [{ id: '0', name: 'Odenmedi' }, { id: '1', name: 'Odendi' }, { id: '2', name: 'Icrada' }];

  constructor(service: TahakkukService, 
    gelirGiderTanimService: GelirGiderTanimService
    , bagimsizBolumKisiService: BagimsizBolumKisiService,
    kisiService: KisiService) {
    super(service);
    this.columns = [{
      key: 'id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true, visible: true },
      visible: false,
    },
    {
      key: 'tutar',
      name: 'Tutar',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
      },
      editorOptions: {
        format: {
          type: 'currency',
        },
        placeholder: 'Para'
      },
    },
    {
      key: 'odenenTutar',
      name: 'Ödenen Tutar',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
      },
      editorOptions: {
        format: {
          type: 'currency',
        },
      },
    },
    {
      key: 'durumu',
      name: 'Borç Durumu',
      type: 'select',
      editorOptions: {
        itemsAsync: of(this.aidatDurumulari),
        displayExpr: 'name',
        valueExpr: 'id'
      }
    },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'string',
      visible: true,
    },
    {
      key: 'vadeTarihi',
      name: 'Vade Tarihi',
      type: 'date',
      format: 'dd.MM.yyyy',
      validators: [{
        type: 'required',
        message: 'Vade Tarihi zorunludur',
      }],
      editorOptions: {
        type: 'date',
      },
    },
    {
      key: 'bagimsizBolumKisiId',
      name: 'Bağımsız Bölüm Kişi',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'Bağımsız Bölüm Kişi zorunludur',
      }],
      editorOptions: {
        itemsAsync: bagimsizBolumKisiService.getAllWithKisi(),
        displayExpr: (item) => {  
          if (item)  
            return item.kisi.ad +  ' ' + item.kisi.soyad;  
          else  
              return "";  
        },  
        valueExpr: 'id',
        // customParams: {
        //   detailKey: 'bagimsizBolumId',
        //   routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':bagimsizBolumId', 'detay']
        // },
      },
      //cellTemplate: 'detailLink',
      visible: true,
    },
    {
      key: 'odemeTipiId',
      name: 'İşlem Tipi',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'İşlem Tipi zorunludur',
      }],
      editorOptions: {
        itemsAsync: gelirGiderTanimService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id'
      },
      visible: true,
    },
  ];
  }
}

