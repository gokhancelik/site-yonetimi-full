import { Kisi } from '../kisi/kisi.model';
import { Injector } from '@angular/core';
import { KisiService } from '../kisi/kisi.service';
import { MeskenService } from '../mesken/mesken.service';
import { Mesken } from '../mesken/mesken.model';


export class MeskenKisi {
  id: string;
  meskenId?: string;
  kisiId: string;
  baslangicTarihi?: Date;
  bitisTarihi?: Date;
  kisi?: Kisi;
  mesken?: Mesken;

  colDefs(injector: Injector) {
    return [{
      key: 'id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true },
      visible: false,
    },
    {
      key: 'meskenId',
      name: 'Mesken',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'Mesken zorunludur',
      }],
      editorOptions: {
        itemsAsync: injector.get(MeskenService).getList(),
        displayExpr: 'kod',
        valueExpr: 'id',
        customParams: {
          detailKey: 'meskenId',
          routerLink: ['/admin', 'tanimlamalar', 'mesken', ':meskenId', 'detay']
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