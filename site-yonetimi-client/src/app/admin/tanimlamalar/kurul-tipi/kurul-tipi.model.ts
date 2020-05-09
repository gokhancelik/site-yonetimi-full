
export class KurulTipi {
 
    id: string;
    ad: string;
    oncelik: string;

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
            key: 'oncelik',
            name: 'Öncelik',
            type: 'number',
            visible: true,
          },
          ];
          
      }
}