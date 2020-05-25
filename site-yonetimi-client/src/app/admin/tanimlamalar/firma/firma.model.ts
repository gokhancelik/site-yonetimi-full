
export class Firma {
 
    id: string;
    ad: string;
    kod: string;
    telefon: string;
    adres: string;

    colDefs(): any[] {
        return  [{
            key: 'id',
            name: 'Id',
            type: 'string',
            visible: false,
            cellTemplate: 'detailLink',
            editorOptions: {
              readOnly: true,
              customParams: {
                detailKey: 'id',
                routerLink: ['/admin', 'tanimlamalar', 'firma', ':id', 'detay']
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
                routerLink: ['/admin', 'tanimlamalar', 'firma', ':id', 'detay']
              },
            },
          },
          {
            key: 'ad',
            name: 'Ad',
            type: 'string',
            validators: [{
              type: 'required',
              message: 'Ad zorunludur',
            }],
            visible: true
          },
          {
            key: 'telefon',
            name: 'Telefon',
            type: 'string',
            visible: true,
          },
          {
            key: 'adres',
            name: 'Adres',
            type: 'string',
            visible: true,
          }
          ];
          
      }
}