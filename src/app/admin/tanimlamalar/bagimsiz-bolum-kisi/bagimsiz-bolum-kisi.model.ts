import { Kisi } from '../kisi/kisi.model';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.model';
import { Injector } from '@angular/core';
import { BagimsizBolumService } from '../bagimsiz-bolum/bagimsiz-bolum.service';
import { KisiService } from '../kisi/kisi.service';


export class BagimsizBolumKisi {
    id: string;
    bagimsizBolumId?: string;
    kisiId: string;
    baslangicTarihi?: Date;
    bitisTarihi?: Date;
    bagimsizBolum?: BagimsizBolum;
    kisi?: Kisi;

    colDefs(injector: Injector){
        return [{
            key: 'id',
            name: 'Id',
            type: 'string',
            editorOptions: { readOnly: true },
            visible: false,
          },
          {
            key: 'bagimsizBolumId',
            name: 'Bağımsız Bölüm',
            type: 'select',
            validators: [{
              type: 'required',
              message: 'Bağımsız Bölüm zorunludur',
            }],
            editorOptions: {
              itemsAsync: injector.get(BagimsizBolumService).getList(),
              displayExpr: 'kod',
              valueExpr: 'id',
              customParams: {
                detailKey: 'bagimsizBolumId',
                routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':bagimsizBolumId', 'detay']
              },
            },
            cellTemplate: 'detailLink',
            visible: true,
          },
          {
            key: 'kisiId',
            name: 'Kişi',
            type: 'select',
            validators: [{
              type: 'required',
              message: 'Kişi zorunludur',
            }],
            editorOptions: {
              itemsAsync: injector.get(KisiService).getList(),
              displayExpr: 'ad',
              valueExpr: 'id',
              customParams: {
                detailKey: 'kisiId',
                routerLink: ['/admin', 'tanimlamalar', 'kisi', ':kisiId', 'detay']
              },
            },
            cellTemplate: 'detailLink',
            visible: true,
          },
          {
            key: 'baslangicTarihi',
            name: 'Başlangıç Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            validators: [{
              type: 'required',
              message: 'Başlangıç Tarihi zorunludur',
            }],
            editorOptions: {
              type: 'date',
            },
          },
          {
            key: 'bitisTarihi',
            name: 'Bitiş Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            editorOptions: {
              type: 'date',
            },
          },
          ];
    }
}