import { BaseModel } from 'src/app/abstract/base.model';
import { Injector } from '@angular/core';
import { HesapTanimiService } from '../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';

export class SanalPos extends BaseModel {
    ad: string;
    kod: string;
    aktifMi: boolean;
    ayarlar: string;
    colDefs(injector: Injector) {
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
        },
        {
            key: 'hesapId',
            name: 'Hesap',
            type: 'select',
            editorOptions: {
                itemsAsync: injector.get(HesapTanimiService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id'
            },
        },
        {
            key: 'ayarlar',
            name: 'Ayarlar',
            type: 'string',
        },
        {
            key: 'aktifMi',
            name: 'Aktif Mi',
            type: 'boolean',
        },
        {
            key: 'komisyon',
            name: 'Komisyon',
            type: 'number',
            visible: true,
            format: {
              type: 'percent',
              precision: 2
            },
            editorOptions: {
              format: {
                type: 'percent',
                precision: 2
              },
            },
          }];
    }
}
