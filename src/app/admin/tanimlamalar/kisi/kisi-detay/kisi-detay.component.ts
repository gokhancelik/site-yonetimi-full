import { Component, OnInit } from '@angular/core';
import { BagimsizBolum } from '../../bagimsiz-bolum/bagimsiz-bolum.model';
import { BaseListComponent } from '../../../base-list.component';
import { BlokService } from '../../blok/blok.service';
import { BagimsizBolumService } from '../../bagimsiz-bolum/bagimsiz-bolum.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { AidatGrubuService } from '../../aidat-grubu/aidat-grubu.service';
import { ActivatedRoute } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { BagimsizBolumKisiService } from '../../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';
import { BagimsizBolumKisi } from '../../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.model';

@Component({
  selector: 'app-kisi-detay',
  templateUrl: './kisi-detay.component.html',
  styleUrls: ['./kisi-detay.component.scss']
})
export class KisiDetayComponent implements OnInit {

  columns: any[];
  popupVisible = false;
  grid: DxDataGridComponent;
  bagimsizBolum: BagimsizBolum[];
  dataSource: CustomStore;
  kisiId: string;
  selectedStartDate: Date;
  selectedBagimsizBolumId: string;
  bagimsizBolumKisi : BagimsizBolumKisi = new BagimsizBolumKisi();
  ngOnInit() {
      this.kisiId = this.route.snapshot.params.id;
      this.getData();
  }
  constructor(private service: BagimsizBolumService,
    private kisiService: BagimsizBolumKisiService,
     blokService: BlokService,
    private aidatGrubuService: AidatGrubuService,
    private route: ActivatedRoute) {
    
    this.columns = [{
      key: 'bagimsizBolum.id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true },
      visible: true,
    },
    {
      key: 'bagimsizBolum.ad',
      name: 'Ad',
      type: 'string',
      editorOptions: { readOnly: true },
      validators: [{
        type: 'required',
        message: 'Ad zorunludur',
      }],
      visible: true,
    },
    {
      key: 'bagimsizBolum.kod',
      name: 'Kod',
      type: 'string',
      editorOptions: { readOnly: true },
      validators: [{
        type: 'required',
        message: 'Kod zorunludur',
      }],
      visible: true,
    },
    {
      key: 'baslangicTarihi',
      name: 'bsltrh',
      type: 'date',
      validators: [{
        type: 'required',
        message: 'Başlangıç tarihi zorunludur',
      }],
      visible: true,
    },
    {
      key: 'bitisTarihi',
      name: 'bshtrh',
      type: 'date',
      visible: true,
    },
    {
      key: 'bagimsizBolum.aciklama',
      name: 'Açıklama',
      type: 'string',
      editorOptions: { readOnly: true },
      visible: true,
    },
    
    {
      key: 'bagimsizBolum.blokId',
      name: 'Blok',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'Blok zorunludur',
      }],
      editorOptions: {
        itemsAsync: blokService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id',
        readOnly : true,
        customParams: {
          detailKey: 'id',
          routerLink: ['/admin', 'tanimlamalar', 'blok', ':id', 'detay']
        },
      },
      cellTemplate: 'detailLink',
      visible: true,
    }];
    this.service.getList<BagimsizBolum>()
      .subscribe(d => {
        this.bagimsizBolum = d;
      });
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'upload',
        hint: 'Bagimsiz Bölüm Ata',
        onClick: this.bagimsizBoluListOpenModal.bind(this),
      },
    });
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
  bagimsizBoluListOpenModal(e) {
    let selectedBBs = this.grid.selectedRowKeys;
    this.popupVisible = selectedBBs && selectedBBs.length > 0;
  }
  assignBagimsizBolum(){
    this.bagimsizBolumKisi.kisiId = this.kisiId;
    console.log(this.bagimsizBolumKisi);
    this.kisiService.add(this.bagimsizBolumKisi).subscribe(d => {
      this.popupVisible = false;
      this.getData();
    });
  }

  getData()
  {
      this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
          return this.kisiService.getByKisiId(this.kisiId).toPromise();
      },
      update: (key, values) => {
          return this.kisiService.update(key, values).toPromise();
      },
      remove: (key) => {
          return this.kisiService.delete(key).toPromise();
        },
  });
  }
  onRowUpdating(options)
  {
    options.newData = Object.assign({}, options.oldData, options.newData);
  }
}
