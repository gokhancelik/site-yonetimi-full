import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { BagimsizBolumKisiService } from '../../tanimlamalar/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';
import { GelirGiderTanimService } from '../../tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';

export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

export class TahakkukModel {
    id: string;
    vadeTarihi: Date;
    aciklama: string;
    tutar: number;
    odenenTutar?: number;
    sonTahsilatTarihi?: Date;
    faizOrani: number;
    odemeTipiId: string;
    bagimsizBolumKisiId: string;
    durumu: AidatDurumu;
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
                itemsAsync: of([{ id: '0', name: 'Odenmedi' }, { id: '1', name: 'Odendi' }, { id: '2', name: 'Icrada' }]),
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
                itemsAsync: injector.get(BagimsizBolumKisiService).getAllWithKisi(),
                displayExpr: (item) => {
                    if (item)
                        return item.kisi.ad + ' ' + item.kisi.soyad;
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
                itemsAsync: injector.get(GelirGiderTanimService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id'
            },
            visible: true,
        },
        ];
    }
}