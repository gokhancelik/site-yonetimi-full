import { Component, OnInit, Input } from '@angular/core';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi.model';
import { BaseListComponent } from '../../../../admin/base-list.component';
import { BagimsizBolumKisiService } from '../bagimsiz-bolum-kisi.service';
import { BagimsizBolumService } from '../../bagimsiz-bolum/bagimsiz-bolum.service';
import { KisiService } from '../../kisi/kisi.service';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs';

@Component({
  selector: 'app-bagimsiz-bolum-kisi-list',
  templateUrl: './bagimsiz-bolum-kisi-list.component.html',
  styleUrls: ['./bagimsiz-bolum-kisi-list.component.scss']
})
export class BagimsizBolumKisiListComponent extends BaseListComponent<BagimsizBolumKisi> implements OnInit {
  columns: any[];
  popupVisible = false;
  bbAidatGrubu: any = {};
  @Input() bagimsizBolumId: string;
  @Input() kisiId: string;
  constructor(service: BagimsizBolumKisiService,
    private bagimsizBolumService: BagimsizBolumService,
    private kisiService: KisiService) {
    super(service);
    this.columns = [{
      key: 'id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true },
      visible: false,
    },
    {
      key: 'bagimsizBolumId',
      name: 'Bağımsız Bölüm',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'Bağımsız Bölüm zorunludur',
      }],
      editorOptions: {
        itemsAsync: bagimsizBolumService.getList(),
        displayExpr: 'kod',
        valueExpr: 'id',
        customParams: {
          detailKey: 'bagimsizBolumId',
          routerLink: ['/admin', 'tanimlamalar', 'bagimsiz-bolum', ':bagimsizBolumId', 'detay']
        },
      },
      cellTemplate: 'detailLink',
      visible: true,
    },
    {
      key: 'kisiId',
      name: 'Kişi',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'Kişi zorunludur',
      }],
      editorOptions: {
        itemsAsync: kisiService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id',
        customParams: {
          detailKey: 'kisiId',
          routerLink: ['/admin', 'tanimlamalar', 'kisi', ':kisiId', 'detay']
        },
      },
      cellTemplate: 'detailLink',
      visible: true,
    },
    {
      key: 'baslangicTarihi',
      name: 'Başlangıç Tarihi',
      type: 'date',
      format: 'dd.MM.yyyy',
      validators: [{
        type: 'required',
        message: 'Başlangıç Tarihi zorunludur',
      }],
      editorOptions: {
        type: 'date',
      },
    },
    {
      key: 'bitisTarihi',
      name: 'Bitiş Tarihi',
      type: 'date',
      format: 'dd.MM.yyyy',
      editorOptions: {
        type: 'date',
      },
    },
    ];
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.bagimsizBolumId) {
          return this.bagimsizBolumService.getKisis(this.bagimsizBolumId).toPromise();
        } else if (this.kisiId) {
          return this.kisiService.getBagimsizBolums(this.kisiId).toPromise();
        }
        return of([]).toPromise();
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
    (e.data as BagimsizBolumKisi).bagimsizBolumId = this.bagimsizBolumId;
    (e.data as BagimsizBolumKisi).kisiId = this.kisiId;
  }
}
