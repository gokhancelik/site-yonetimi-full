import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Borc } from '../borc/borc.model';
import { of } from 'rxjs';
import { Injector } from '@angular/core';
import { HesapTanimiService } from '../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapHareketleriService } from './hesap-hareketi.service';
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
    hareketTipi: HareketTipi;
    hesapTanimiId: string;
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
            editorOptions: {
                displayExpr: 'tutar',
                placeholder: 'Para'
            },
        },
        {
            key: 'hareketTipi',
            name: 'Hareket Tipi',
            type: 'select',
            editorOptions: {
                itemsAsync: of([{ id: '1', name: 'Gelir' }, { id: '2', name: 'Gider' }, { id: '3', name: 'GelirGider' }]),
                displayExpr: 'name',
                valueExpr: 'id'
            }
        },
        {
            key: 'islemTarihi',
            name: 'İşlem Tarihi',
            type: 'date',
            format: 'dd.MM.yyyy',
            validators: [{
                type: 'required',
                message: 'İşlem Tarihi zorunludur',
            }],
            editorOptions: {
                type: 'date',
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
                itemsAsync: injector.get(HesapHareketleriService).getListWithInnerModel(),
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
        ];
    }
}
