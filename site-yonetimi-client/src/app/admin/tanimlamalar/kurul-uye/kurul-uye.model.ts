import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { MeskenService } from '../mesken/mesken.service';
import { KisiService } from '../kisi/kisi.service';
import { KurulTipiService } from '../kurul-tipi/kurul-tipi.service';
import { KurulUyeTipiService } from '../kurul-uye-tipi/kurul-uye-tipi.service';

export class KurulUye {
    id: string;
    baslamaTarihi: Date;
    bitisTarihi: Date;    
    meskenId: string;
    kurulUyeTipiId: string;
    kisiId: string;
    aktifMi: boolean;
    kurulTipiId: string;
    colDefs(injector: Injector) {
        return [{
            key: 'id',
            name: 'Id',
            type: 'string',
            editorOptions: { readOnly: true, visible: false },
            visible: false,
        },
        {
            key: 'aktifMi',
            name: 'Durumu',
            type: 'select',
            editorOptions: {
                itemsAsync: of([{ id: true, name: 'Aktif' }, { id: false, name: 'Pasif' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },      
        {
            key: 'baslamaTarihi',
            name: 'Başlama Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            validators: [{
                type: 'required',
                message: 'Başlama Tarihi zorunludur',
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
                displayExpr: (item) => {
                    if (item)
                        return item.ad + " " +item.soyad;
                    else
                        return "";
                },
                valueExpr: 'id'
            },
            visible: true,
        },
        {
            key: 'kurulTipiId',
            name: 'Kurul Tipi',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Kurul Tipi zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(KurulTipiService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id'
            },
            visible: true,
        },
        {
            key: 'kurulUyeTipiId',
            name: 'Kurul Üye Tipi',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Kurul Üye Tipi zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(KurulUyeTipiService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id'
            },
            visible: true,
        }
        ];
    }
}