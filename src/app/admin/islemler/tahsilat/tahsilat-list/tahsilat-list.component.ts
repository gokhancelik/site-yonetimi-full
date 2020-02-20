import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahsilatModel } from '../tahsilat-model';
import { TahsilatService } from '../tahsilat-service';
import { KisiService } from 'src/app/admin/tanimlamalar/kisi/kisi.service';
import { BagimsizBolumKisiService } from 'src/app/admin/tanimlamalar/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';
import { GelirGiderTanimService } from 'src/app/admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { TahakkukService } from '../../tahakkuk/tahakkuk-service';
import { of } from 'rxjs';

@Component({
  selector: 'app-tahsilat-list',
  templateUrl: './tahsilat-list.component.html',
  styleUrls: ['./tahsilat-list.component.scss']
})
export class TahsilatListComponent extends BaseListComponent<TahsilatModel> implements OnInit {
  columns: any[];
  odemeYontemi = [{ id: '0', name: 'HavaleEFT' }, { id: '1', name: 'KrediKarti' }, { id: '3', name: 'Kasa' }, { id: '4', name: 'Devir' }];
  tahsilatDurumu = [{ id: '0', name: 'Bekliyor' }, { id: '1', name: 'Onaylandi' }, { id: '2', name: 'Hata' }, { id: '3', name: 'Iptal' }];

  constructor(service: TahsilatService, 
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
      key: 'odemeTarihi',
      name: 'Ödeme Tarihi',
      type: 'date',
      format: 'dd.MM.yyyy',
      visible: true,
    },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'string',
      visible: true,
      cellTemplate: 'detailLink',
      editorOptions:{
        customParams: {
          detailKey: 'id',
          routerLink: ['/admin', 'islemler', 'tahsilat', ':id', 'detay']
        }
      }
    },
    {
      key: 'tutar',
      name: 'Tutar',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
      },
    },
    {
      key: 'odemeYontemi',
      name: 'Ödeme Yöntemi',
      type: 'select',
      editorOptions: {
        itemsAsync: of(this.odemeYontemi),
        displayExpr: 'name',
        valueExpr: 'id'
      }
    },
    {
      key: 'durumu',
      name: 'Tahsilat Durumu',
      type: 'select',
      editorOptions: {
        itemsAsync: of(this.tahsilatDurumu),
        displayExpr: 'name',
        valueExpr: 'id'
      }
    },
    {
      key: 'bankaSiparisNo',
      name: 'Banka Sipariş No',
      type: 'string',
      visible: true,
    },
    {
      key: 'bagimsizBolumKisiId',
      name: 'Bağımsız Bölüm Kişi',
      type: 'select',
      editorOptions: {
        itemsAsync: bagimsizBolumKisiService.getAllWithKisi(),
        displayExpr: (item) => {  
          if (item)  
            return item.kisi.ad +  ' ' + item.kisi.soyad;  
          else  
              return "";  
        },  
        valueExpr: 'id',
      },
      visible: true,
    },
  ];
  }
}
