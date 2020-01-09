import { Component, OnInit } from '@angular/core';
import { OnlineIslemlerService } from '../online-islemler.service';
import { Tahakkuk } from '../models/tahakkuk.model';
import { BaseListComponent } from '../../../admin/base-list.component';
import CustomStore from 'devextreme/data/custom_store';
import { GelirGiderTanimService } from '../../../admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';

@Component({
  selector: 'app-tahakkuk-list',
  templateUrl: './tahakkuk-list.component.html',
  styleUrls: ['./tahakkuk-list.component.scss']
})
export class TahakkukListComponent implements OnInit {
  ngOnInit(): void {
  }
  columns: any[];
  dataSource: CustomStore;
  constructor(private service: OnlineIslemlerService,
    private gelirGiderTanimiService: GelirGiderTanimService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return this.service.getOdenmemisAidatlar().toPromise();
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
        itemsAsync: gelirGiderTanimiService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id'
      },
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
        },
      },
    }
    ];
  }
}
