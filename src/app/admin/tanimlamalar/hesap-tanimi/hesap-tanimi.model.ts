export enum HesapTipi {
    Kasa = 100,
    Banka = 102
}
export class HesapTanimi {
    id: string;
    ad: string;
    aciklama: string;
    hesapTipi: HesapTipi;
    bankaId?: string;
    hesapAdi?: string;
    subeKodu?: string;
    hesapNo?: string;
    iban?: string;

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
            key: 'aciklama',
            name: 'Açıklama',
            type: 'textarea',
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