import { BaseModel } from '../../../abstract/base.model';

export class MeskenTipiModel extends BaseModel {
    ad: string;
    kod: string;
    aciklama: string;
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
            key: 'aciklama',
            name: 'Açıklama',
            type: 'string',
        }];
    }
}
