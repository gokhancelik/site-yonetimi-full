import { Component, OnInit, Input } from '@angular/core';
import { BagimsizBolum } from '../bagimsiz-bolum.model';
import { BaseListComponent } from '../../../base-list.component';
import { BlokService } from '../../blok/blok.service';
import { BagimsizBolumService } from '../bagimsiz-bolum.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { AidatGrubuService } from '../../aidat-grubu/aidat-grubu.service';
import { AidatGrubu } from '../../aidat-grubu/aidat-grubu.model';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-bagimsiz-bolum-list',
  templateUrl: './bagimsiz-bolum-list.component.html',
  styleUrls: ['./bagimsiz-bolum-list.component.scss']
})
export class BagimsizBolumListComponent extends BaseListComponent<BagimsizBolum> implements OnInit {
  columns: any[];
  popupVisible = false;
  isDetay = false;
  bbAidatGrubu: any = {};
  @Input() blokId: string;
  grid: DxDataGridComponent;
  aidatGruplari: AidatGrubu[];
  constructor(private serviceBagimsizBolum: BagimsizBolumService, blokService: BlokService,
    private aidatGrubuService: AidatGrubuService) {
    super(serviceBagimsizBolum);
    this.columns = [{
      key: 'id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true },
      visible: false,
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
          routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':id', 'detay']
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
          routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':id', 'detay']
        },
      },
    },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'string',
      visible: true,
    },
    {
      key: 'blokId',
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
        customParams: {
          detailKey: 'blokId',
          routerLink: ['/admin', 'tanimlamalar', 'blok', ':id', 'detay']
        },
      },
      cellTemplate: 'detailLink',
      visible: true,
    }];
    this.aidatGrubuService.getList<AidatGrubu>()
      .subscribe(d => {
        this.aidatGruplari = d;
      });
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'upload',
        hint: 'Aidat Grubu Ata',
        onClick: this.assignAidatGrubuOpenModal.bind(this),
        visible: !this.isDetay
      },
    });
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
  assignAidatGrubuOpenModal(e) {
    let selectedBBs = this.grid.selectedRowKeys;
    this.popupVisible = selectedBBs && selectedBBs.length > 0;
  }
  assignAidatGrubu(e, form) {
    let selectedBBs = this.grid.selectedRowKeys;
    for (let i = 0; i < selectedBBs.length; i++) {
      const bb = selectedBBs[i];
      (this.service as BagimsizBolumService)
        .assignAidatGrubu(bb, this.bbAidatGrubu)
        .subscribe(d => {
          this.popupVisible = false;
        });
    }
  } 
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.blokId) {
          this.isDetay = true;
          return this.serviceBagimsizBolum.findByBlokId(this.blokId).toPromise();
        }
        else{
          return this.service.getList().toPromise();
        }
      },
      insert: (values) => {
        return this.service.add(values).toPromise();
      },
      update: (key, values) => {
        return this.service.update(key, values).toPromise();
      },
      remove: (key) => {
        return this.service.delete(key).toPromise();
      },
    });
  }
  onInitNewRow(e) {
    (e.data as BagimsizBolum).blokId = this.blokId;
  }
}

