import { Component, OnInit } from '@angular/core';
import { OnlineIslemlerService } from '../online-islemler.service';
import CustomStore from 'devextreme/data/custom_store';
import { GelirGiderTanimService } from '../../../admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';

@Component({
  selector: 'app-odenmis-tahakkuklar',
  templateUrl: './odenmis-tahakkuklar.component.html',
  styleUrls: ['./odenmis-tahakkuklar.component.scss']
})
export class OdenmisTahakkuklarComponent implements OnInit {
  dataSource: CustomStore;
  columns: any[];

  constructor(private service: OnlineIslemlerService,
    private gelirGiderTanimiService: GelirGiderTanimService) { }

  ngOnInit(): void {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return this.service.getOdenmisAidatlar().toPromise();
      },
    });
    this.columns = [{
      key: 'id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true },
      visible: false,
    },
    {
      key: 'vadeTarihi',
      name: 'Vade Tarihi',
      type: 'date',
    },
    {
      key: 'odemeTipiId',
      name: 'Ödeme Tipi',
      type: 'select',
      editorOptions: {
        itemsAsync: this.gelirGiderTanimiService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id'
      },
      visible: true,
    },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'textarea',
    },
    {
      key: 'tutar',
      name: 'Tutar',
      totalSummaryType: 'sum',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
        precision: 2
      }
    },
    {
      key: 'odenenTutar',
      name: 'Ödenen Tutar',
      totalSummaryType: 'sum',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
        precision: 2
      }
    }
    ];
  }

}
