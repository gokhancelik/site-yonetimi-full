
export class AidatGrubu {
    id: string;
    ad: string;
    aciklama: string;
    tutar: number;
    colDefs() {
        return  [{
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
            key: 'tutar',
            name: 'Tutar',
            type: 'number',
            visible: true,
            format: {
              type: 'currency',
            },
            editorOptions: {
              format: {
                type: 'currency',
                precision: 2
              },
            },
          }];
    }
}
