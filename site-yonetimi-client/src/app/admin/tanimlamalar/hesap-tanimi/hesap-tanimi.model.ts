import { Injector } from '@angular/core';
import { MeskenService } from '../mesken/mesken.service';

export enum HesapTipi {
    Kasa = 100,
    Banka = 102
}
export class HesapTanimi {
    id: string;
    ad: string;
    aciklama: string;
    meskenId: string;
    hesapTipi: HesapTipi;
    bankaId?: string;
    hesapAdi?: string;
    subeKodu?: string;
    hesapNo?: string;
    iban?: string;

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
            cellTemplate: 'detailLink',
            editorOptions: {
              customParams: {
                detailKey: 'id',
                routerLink: ['/admin', 'tanimlamalar', 'hesap-tanimi', ':id', 'detay']
              },
            }
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'textarea',
            visible: true,
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
            key: 'hesapAdi',
            name: 'Hesap Adı',
            visible: true,
        },
        {
            key: 'subeKodu',
            name: 'Şube Kodu',
            type: 'string',
            visible: true,
        },
        {
            key: 'hesapNo',
            name: 'Hesap No',
            type: 'string',
            visible: true,
        },
        {
            key: 'iban',
            name: 'IBAN',
            type: 'string',
            visible: true,
        },
        {
            key: 'hesapTipi',
            name: 'Hesap Tipi',
            type: 'select',
            editorOptions: {
                items: [{ id: 100, name: 'Kasa' }, { id: 200, name: 'Banka' }],
                displayExpr: 'name',
                valueExpr: 'id'
            }
        }];
    }
}