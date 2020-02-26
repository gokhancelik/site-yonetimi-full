import { BlokService } from '../blok/blok.service';
import { Injector } from '@angular/core';

export class BagimsizBolum {

    id: string;
    ad: string;
    kod: string;
    aciklama: string;
    blokId: string;
    colDefs(injector: Injector): any[] {
        return [{
            key: 'id',
            name: 'Id',
            type: 'string',
            editorOptions: { readOnly: true },
            visible: false,
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
                customParams: {
                    detailKey: 'id',
                    routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':id', 'detay']
                },
            },
        },
        {
            key: 'kod',
            name: 'Kod',
            type: 'string',
            validators: [{
                type: 'required',
                message: 'Kod zorunludur',
            }],
            visible: true,
            cellTemplate: 'detailLink',
            editorOptions: {
                customParams: {
                    detailKey: 'id',
                    routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':id', 'detay']
                },
            },
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'string',
            visible: true,
        },
        {
            key: 'blokId',
            name: 'Blok',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Blok zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(BlokService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id',
                customParams: {
                    detailKey: 'blokId',
                    routerLink: ['/admin', 'tanimlamalar', 'blok', ':blokId', 'detay']
                },
            },
            cellTemplate: 'detailLink',
            visible: true,
        }];
    }
}
