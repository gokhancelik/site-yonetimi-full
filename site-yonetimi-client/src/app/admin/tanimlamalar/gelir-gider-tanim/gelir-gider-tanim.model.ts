export enum HareketTipi {
    Gelir = 1,
    Gider = 2,
    GelirGider = 3
}
export class GelirGiderTanimi {
    id: string;
    ad: string;
    kod: string;
    aciklama: string;
    hareketTipi: HareketTipi;
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
            type: 'textarea',
            visible: true,
        },
        {
            key: 'hareketTipi',
            name: 'Hareket Tipi',
            type: 'select',
            editorOptions: {
                items: [{ id: 1, name: 'Gelir' }, { id: 2, name: 'Gider' }, { id: 3, name: 'Gelir/Gider' }],
                displayExpr: 'name',
                valueExpr: 'id'
            }
        }
        ];
    }
}