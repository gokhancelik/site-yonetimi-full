import { Borc } from '../borc/borc.model';
import { of } from 'rxjs';
import { Injector } from '@angular/core';
import { HesapTanimiService } from '../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapHareketleriService } from './hesap-hareketi.service';
import { KisiService } from '../../tanimlamalar/kisi/kisi.service';
import { BorcService } from '../borc/borc.service';
export enum HareketTipi {
    Gelir = 1,
    Gider = 2,
    GelirGider = 3
}
export class HesapHareketi {
    id: string;
    islemTarihi: Date;
    tahsilatId?: string;
    borcId?: string;
    tutar: number;
    hesapTanimiId: string;
    dekontNo: string;
    aciklama: string;
    borc?: Borc;
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
            key: 'bakiye',
            name: 'Bakiye',
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
            }
        },
        {
            key: 'islemTarihi',
            name: 'İşlem Tarihi',
            type: 'datetime',
            format: 'dd.MM.yyyy hh:mm',
            validators: [{
                type: 'required',
                message: 'İşlem Tarihi zorunludur',
            }],
            editorOptions: {
                type: 'datetime',
            },
        },
        {
            key: 'hesapTanimiId',
            name: 'Hesap',
            type: 'select',
            editorOptions: {
                itemsAsync: injector.get(HesapTanimiService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id'
            },
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'textarea',
            editorOptions: {
                itemsAsync: injector.get(HesapHareketleriService).getListWithInnerModel({}),
                displayExpr: (item) => {
                    if (item)
                        return item.borc ? item.borc.aciklama : (item.tahsilat ? item.tahsilat.aciklama : "");
                    else
                        return "";
                },
                valueExpr: 'aciklama'
            },
            visible: true,
        },
        {
            key: 'dekontNo',
            name: 'Dekont No',
            type: 'string'
        }
        ];
    }
}
export class BankaHesapHareketi {
    tarih: Date;
    aciklama: string;
    etiket: string;
    tutar: number;
    bakiye: number;
    dekontNo: string;
    kisiId: string;
    borcId: string;
    hesapId: string;
    colDefs(injector: Injector) {
        return [
            {
                key: 'islemTarihi',
                name: 'İşlem Tarihi',
                type: 'date',
                format: 'dd.MM.yyyy',
                validators: [{
                    type: 'required',
                    message: 'Tarih zorunludur',
                }],
                editorOptions: {
                    type: 'date',
                },
            },
            {
                key: 'aciklama',
                name: 'Açıklama',
                type: 'textarea',
                editorOptions: {
                    itemsAsync: injector.get(HesapHareketleriService).getListWithInnerModel({}),
                    displayExpr: (item) => {
                        if (item)
                            return item.borc ? item.borc.aciklama : (item.tahsilat ? item.tahsilat.aciklama : "");
                        else
                            return "";
                    },
                    valueExpr: 'aciklama'
                },
                visible: true,
            },
            {
                key: 'tutar',
                name: 'Tutar',
                type: 'number',
                visible: true,
                editorOptions: {
                    displayExpr: 'tutar',
                    placeholder: 'Para'
                },
            },
            {
                key: 'bakiye',
                name: 'Bakiye',
                type: 'number',
                visible: true,
                editorOptions: {
                    displayExpr: 'tutar',
                    placeholder: 'Para'
                },
            },
            {
                key: 'dekontNo',
                name: 'Dekont No',
                type: 'string'
            },
            {
                key: 'hesapTanimiId',
                name: 'Hesap',
                type: 'select',
                editorOptions: {
                    itemsAsync: injector.get(HesapTanimiService).getList(),
                    displayExpr: 'ad',
                    valueExpr: 'id'
                },
            },
            {
                key: 'kisiId',
                name: 'Kişi',
                type: 'select',
                editorOptions: {
                    itemsAsync: injector.get(KisiService).getList(),
                    displayExpr: 'tamAd',
                    valueExpr: 'id'
                },
            },
            {
                key: 'borcId',
                name: 'Borç',
                type: 'select',
                editorOptions: {
                    itemsAsync: injector.get(BorcService).getList(),
                    displayExpr: 'ad',
                    valueExpr: 'id'
                },
            },
        ];
    }
}