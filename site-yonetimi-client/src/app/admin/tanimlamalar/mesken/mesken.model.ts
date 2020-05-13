import { BaseModel } from '../../../abstract/base.model';
import { Injector } from '@angular/core';
import { MeskenService } from './mesken.service';

export class Mesken extends BaseModel {
    ad: string;
    kod: string;
    aciklama: string;
    ustId: string;
    meskenTipiId: string;
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
                    routerLink: ['/admin', 'tanimlamalar', 'mesken', ':id', 'detay']
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
                    routerLink: ['/admin', 'tanimlamalar', 'mesken', ':id', 'detay']
                },
            },
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'textarea',
            visible: true,
        },
        {
            key: 'ustId',
            name: 'Üst',
            type: 'select',
            validators: [],
            editorOptions: {
                itemsAsync: injector.get(MeskenService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id',
                customParams: {
                    detailKey: 'ustId',
                    routerLink: ['/admin', 'tanimlamalar', 'mesken', ':ustId', 'detay']
                },
            },
            cellTemplate: 'detailLink',
            visible: true,
        }
    ];
    }
}