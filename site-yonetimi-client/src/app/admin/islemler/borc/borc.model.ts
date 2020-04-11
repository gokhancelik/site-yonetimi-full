import { Injector } from '@angular/core';
import { BlokService } from '../../tanimlamalar/blok/blok.service';
import { GelirGiderTanimService } from '../../tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { of } from 'rxjs';

export enum BorcDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

export class Borc {
    id: string;
    blokId: string;
    vadeTarihi: Date;
    aciklama: string;
    tutar: number;
    odenenTutar?: number;
    durumu: BorcDurumu;
    islemTipiId: string;

    colDefs(injector: Injector) {
        return [{
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
                itemsAsync: of([{ id: '0', name: 'Odenmedi' }, { id: '1', name: 'Odendi' }, { id: '2', name: 'Icrada' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'textarea',
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
        },
        {
            key: 'islemTipiId',
            name: 'İşlem Tipi',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'İşlem Tipi zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(GelirGiderTanimService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id'
            },
            visible: true,
        }];
    }
};