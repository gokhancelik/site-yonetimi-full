import { Injector } from '@angular/core';
import { GelirGiderTanimService } from '../../tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { of } from 'rxjs';
import { MeskenService } from '../../tanimlamalar/mesken/mesken.service';
import { FirmaService } from '../../tanimlamalar/firma/firma.service';

export enum BorcDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

export class Borc {
    id: string;
    meskenId: string;
    vadeTarihi: Date;
    aciklama: string;
    tutar: number;
    odenenTutar?: number;
    durumu: BorcDurumu;
    islemTipiId: string;
    tahakkukOlusturulduMu: boolean;
    firmaId: string;

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
                precision: 2
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
                precision: 2
            },
            editorOptions: {
                format: {
                    type: 'currency'
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
            key: 'meskenId',
            name: 'Mesken',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Mesken zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(MeskenService).getList(),
                displayExpr: 'ad',
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
            key: 'firmaId',
            name: 'Firma',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Firma zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(FirmaService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id',
                customParams: {
                    detailKey: 'firmaId',
                    routerLink: ['/admin', 'tanimlamalar', 'firma', ':firmaId', 'detay']
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
        },
        {
            key: 'tahakkukOlusturulduMu',
            name: 'Tahakkuk Durumu',
            type: 'select',
            editorOptions: {
                itemsAsync: of([{ id: true, name: 'Evet' }, { id: false, name: 'Hayır' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },   
    ];
    }
};