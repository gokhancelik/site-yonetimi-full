
export class Kisi {
 
    id: string;
    ad: string;
    tamAd: string;
    soyad: string;
    telefon: string;
    cepTelefon: string;
    adres: string;
    eposta: string;
    tcKimlikNo: string;

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
                routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
              },
            },
          },
          {
            key: 'tcKimlikNo',
            name: 'TC Kimlik No',
            type: 'string',
            visible: true,
            cellTemplate: 'detailLink',
            editorOptions: {
              customParams: {
                detailKey: 'id',
                routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
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
            visible: true,
            cellTemplate: 'detailLink',
            editorOptions: {
              customParams: {
                detailKey: 'id',
                routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
              },
            },
          },
          {
            key: 'soyad',
            name: 'Soyad',
            type: 'string',
            validators: [{
              type: 'required',
              message: 'Soyad zorunludur',
            }],
            visible: true,
            cellTemplate: 'detailLink',
            editorOptions: {
              customParams: {
                detailKey: 'id',
                routerLink: ['/admin', 'tanimlamalar', 'kisi', ':id', 'detay']
              },
            },
          },
          {
            key: 'telefon',
            name: 'Telefon',
            type: 'string',
            visible: true,
          },
          {
            key: 'cepTelefon',
            name: 'Cep Telefon',
            type: 'string',
            visible: true,
          },
          {
            key: 'eposta',
            name: 'E-posta',
            type: 'string',
            visible: true,
          },
          {
            key: 'adres',
            name: 'Adres',
            type: 'string',
            visible: true,
          },
          {
            key: 'sifre',
            name: 'Şifre',
            type: 'string',
            visible: true,
          }
          ];
          
      }
}