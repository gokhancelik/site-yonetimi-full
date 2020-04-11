import { Injector } from '@angular/core';
import { TahsilatService } from './tahsilat-service';
import { GelirGiderTanimService } from '../../tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { TahakkukService } from '../tahakkuk/tahakkuk-service';

export class TahsilatKalemModel {
    id: string;
    tutar: number;
    tahsilatId: string;;
    odemeTipiId: string;
    tahakkukId: string;
    colDefs(injector: Injector) {
        return [{
            key: 'id',
            name: 'Id',
            type: 'string',
            editorOptions: { readOnly: true },
            visible: false,
        },
        {
            key: 'odemeTipiId',
            name: 'Ödeme Tipi',
            type: 'select',
            editorOptions: {
                itemsAsync: injector.get(GelirGiderTanimService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id',
            },
            visible: true,
        },
        {
            key: 'tahakkukId',
            name: 'Tahakkuk',
            type: 'string',
            cellTemplate: 'detailLink',
            editorOptions: {
                customParams: {
                    detailKey: 'tahakkukId',
                    routerLink: ['/admin', 'islemler', 'tahakkuk', ':tahakkukId', 'detay']
                }
            },
            visible: true
        },
        {
            key: 'tutar',
            name: 'Tutar',
            type: 'number',
            format: {
                type: 'currency',
            },
            editorOptions: {
                format: {
                    type: 'currency',
                },
            },
            visible: true
        },
        ];
    }
}