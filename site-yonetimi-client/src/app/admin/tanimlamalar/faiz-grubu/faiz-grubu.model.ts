export class FaizGrubu{
    id: string;
    ad: string;
    aciklama: string;
    oran: number;

    colDefs(){
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
            key: 'oran',
            name: 'Oran',
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