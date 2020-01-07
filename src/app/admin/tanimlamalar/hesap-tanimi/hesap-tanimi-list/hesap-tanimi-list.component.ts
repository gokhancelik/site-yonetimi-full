import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { HesapTanimi } from '../hesap-tanimi.model';
import { HesapTanimiService } from '../hesap-tanimi.service';

@Component({
  selector: 'app-hesap-tanimi-list',
  templateUrl: './hesap-tanimi-list.component.html',
  styleUrls: ['./hesap-tanimi-list.component.scss']
})
export class HesapTanimiListComponent extends BaseListComponent<HesapTanimi> implements OnInit {
  columns: any[];
  constructor(service: HesapTanimiService) {
    super(service);
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
    },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'string',
      visible: true,
    },
    {
      key: 'hesapTipi',
      name: 'Hesap Tipi',
      type: 'select',
      editorOptions: {
        items: [{ id: 100, name: 'Kasa' }, { id: 200, name: 'Banka' }],
        displayExpr: 'name',
        valueExpr: 'id'
      }
    }];
  }
}
