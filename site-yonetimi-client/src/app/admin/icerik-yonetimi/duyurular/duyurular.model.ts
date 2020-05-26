
export class Duyurular {

  id: string;
  baslik: string;
  icerik: string;

  colDefs(): any[] {
    return [
      {
        key: 'baslik',
        name: 'Başlık',
        type: 'string',
        validators: [{
          type: 'required',
          message: 'Başlık zorunludur',
      }],
      },
      {
        key: 'icerik',
        name: 'İçerik',
        type: 'string',
        editCellTemplate: 'htmlEditCellTemplate',
        editorOptions: {
          height: 190, toolbar: {
            items: ['bold', 'italic', 'underline',
              { 
                formatName: 'size', 
                formatValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'] 
            }]
          }
        },
        visible: false,
      }
    ]
  }
}