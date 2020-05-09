
export class KurulUyeTipi {
 
    id: string;
    ad: string;
    kodu: string;

    colDefs(): any[] {
        return  [{
            key: 'id',
            name: 'Id',
            type: 'string',
            visible: false,
            editorOptions: {
              readOnly: true
            },
          },
          {
            key: 'ad',
            name: 'Ad',
            type: 'string',
            visible: true,
          },
          {
            key: 'kodu',
            name: 'Kodu',
            type: 'string',
            visible: true,
          },
          ];
          
      }
}