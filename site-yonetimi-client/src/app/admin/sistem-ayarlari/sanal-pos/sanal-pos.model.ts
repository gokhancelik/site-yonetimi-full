import { BaseModel } from 'src/app/abstract/base.model';

export class SanalPos extends BaseModel {
    ad: string;
    kod: string;
    ayarlar: string;
    colDefs() {
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
            key: 'ayarlar',
            name: 'Ayarlar',
            type: 'string',
        }];
    }
}
