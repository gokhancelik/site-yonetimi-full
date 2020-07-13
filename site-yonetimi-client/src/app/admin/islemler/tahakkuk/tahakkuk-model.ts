import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { GelirGiderTanimService } from '../../tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { MeskenKisiService } from '../../tanimlamalar/mesken-kisi/mesken-kisi.service';

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
    odenecekTutar?: number;
    sonTahsilatTarihi?: Date;
    faizOrani: number;
    odemeTipiId: string;
    meskenKisiId: string;
    durumu: AidatDurumu;
    colDefs(injector: Injector) {
        return [{
            key: 'id',
            name: 'Id',
            type: 'string',
            editorOptions: { readOnly: true, visible: true },
            visible: false
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
                }
            }
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
                    type: 'currency',
                },
                readOnly: true
            },
            sort: false,
            filter: false
        },
        {
            key: 'kalanAnaPara',
            name: 'Kalan Ana Para',
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
                readOnly: true
            },
            sort: false,
            filter: false
        },
        {
            key: 'faiz',
            name: 'Kalan Faiz',
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
                readOnly: true
            },
            sort: false,
            filter: false
        },
        {
            key: 'odenenFaiz',
            name: 'Ödenen Faiz',
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
                readOnly: true
            },
            sort: false,
            filter: false
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
            key: 'meskenKisiId',
            name: 'Mesken Kişi',
            type: 'select',
            validators: [{
                type: 'required',
                message: 'Bağımsız Bölüm Kişi zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(MeskenKisiService).getAllWithKisi(),
                displayExpr: (item) => {
                    if (item)
                        return item.kisi.ad + ' ' + item.kisi.soyad;
                    else
                        return "";
                },
                valueExpr: 'id',
            },
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