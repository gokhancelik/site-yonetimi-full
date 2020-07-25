import { Component, OnInit } from '@angular/core';
import { OnlineIslemlerService } from '../online-islemler.service';
import CustomStore from 'devextreme/data/custom_store';
import { GelirGiderTanimService } from '../../../admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';

@Component({
  selector: 'app-tahsilat-list',
  templateUrl: './tahsilat-list.component.html',
  styleUrls: ['./tahsilat-list.component.scss']
})
export class TahsilatListComponent implements OnInit {
  dataSource: CustomStore;
  columns: any[];

  constructor(private service: OnlineIslemlerService,
    private gelirGiderTanimiService: GelirGiderTanimService) { }

  ngOnInit(): void {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return this.service.getTahsilatlar().toPromise();
      },
    });
    this.columns = [
      {
        key: 'tahsilatNo',
        name: 'Tahsilat No',
        type: 'number',
      },
      // {
      //   key: 'odemeTipiId',
      //   name: 'Ödeme Tipi',
      //   type: 'select',
      //   editorOptions: {
      //     itemsAsync: this.gelirGiderTanimiService.getList(),
      //     displayExpr: 'ad',
      //     valueExpr: 'id'
      //   },
      //   visible: true,
      // },
      {
        key: 'aciklama',
        name: 'Açıklama',
        type: 'textarea',
      },
      {
        key: 'odemeTarihi',
        name: 'Ödeme Tarihi',
        type: 'datetime',
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
    ]
  }

}
