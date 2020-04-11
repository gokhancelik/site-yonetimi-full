import { Injector } from '@angular/core';
import { SiteService } from '../site/site.service';

export class Blok {
    ad: string;
    id: string;
    aciklama: string;
    siteId: string;
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
            cellTemplate: 'detailLink',
            editorOptions: {
                customParams: {
                    detailKey: 'id',
                    routerLink: ['/admin', 'tanimlamalar', 'blok', ':id', 'detay']
                },
            },
            visible: true,
        },
        {
            key: 'aciklama',
            name: 'Açıklama',
            type: 'textarea',
            validators: [{
                type: 'required',
                message: 'Ad zorunludur',
            }],
            visible: true,
        },
        {
            key: 'siteId',
            name: 'Site',
            type: 'select',
            cellTemplate: 'detailLink',
            validators: [{
                type: 'required',
                message: 'Site zorunludur',
            }],
            editorOptions: {
                itemsAsync: injector.get(SiteService).getList(),
                displayExpr: 'ad',
                valueExpr: 'id',
                customParams: {
                    routerLink: ['/admin', 'tanimlamalar', 'site', ':siteId', 'detay']
                },
            },
            visible: true,
        }]
    }
}
