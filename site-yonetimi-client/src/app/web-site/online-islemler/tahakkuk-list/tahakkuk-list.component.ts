import { Component, OnInit } from '@angular/core';
import { OnlineIslemlerService } from '../online-islemler.service';
import { Tahakkuk } from '../models/tahakkuk.model';
import { BaseListComponent } from '../../../admin/base-list.component';
import CustomStore from 'devextreme/data/custom_store';
import { GelirGiderTanimService } from '../../../admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { OdemeService } from '../odeme.service';
import { Router } from '@angular/router';
import { MeskenKisiService } from '../../../admin/tanimlamalar/mesken-kisi/mesken-kisi.service';
import { KisiCuzdan } from '../../../admin/islemler/services/odeme-islemleri.service';

@Component({
  selector: 'app-tahakkuk-list',
  templateUrl: './tahakkuk-list.component.html',
  styleUrls: ['./tahakkuk-list.component.scss']
})
export class TahakkukListComponent implements OnInit {
  columns: any[];
  dataSource: CustomStore;
  seciliTahakkuklar: Tahakkuk[];
  grid: DxDataGridComponent;
  cuzdan: KisiCuzdan;
  ngOnInit(): void {
    this.meskenKisiService.getCurrentUserCuzdan()
      .subscribe(d => {
        this.cuzdan = d;
      })
  }
  constructor(private service: OnlineIslemlerService,
    private router: Router,
    private meskenKisiService: MeskenKisiService,
    private odemeService: OdemeService,
    gelirGiderTanimiService: GelirGiderTanimService
  ) {
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
      name: 'Ödeneen Tutar',
      totalSummaryType: 'sum',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
        precision: 2
      },
      sort: false,
    }
    ];
  }
  onGridReady(e: DxDataGridComponent) {
    e.onSelectionChanged.subscribe(d => {
    });
    this.grid = e;
  }
  odemeYap() {
    this.service.tahsilatOlustur(this.grid.instance.getSelectedRowsData())
      .subscribe(d => {
        this.router.navigate(['online-islemler', 'odeme', d.id])
      });
  }
}
