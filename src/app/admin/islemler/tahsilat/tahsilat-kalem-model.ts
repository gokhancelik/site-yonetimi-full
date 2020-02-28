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
            key: 'tahsilatId',
            name: 'Tahsilat',
            type: 'select',
            editorOptions: {
                itemsAsync: injector.get(TahsilatService).getList(),
                displayExpr: 'durumu',
                valueExpr: 'id',
            },
            visible: true,
        },
        {
            key: 'odemeTipiId',
            name: 'Ödeme Tipi',
            type: 'select',
            editorOptions: {
                itemsAsync: injector.get(GelirGiderTanimService).getList(),
                displayExpr: 'kod',
                valueExpr: 'id',
            },
            visible: true,
        },
        {
            key: 'tahakkukId',
            name: 'Tahakkuk',
            type: 'string',
            editorOptions: {
                itemsAsync: injector.get(TahakkukService).getList(),
                displayExpr: 'durumu',
                valueExpr: 'id',
            },
            visible: true
        },
        {
            key: 'tutar',
            name: 'Tutar',
            type: 'number',
            visible: true
        },
        ];
    }
}