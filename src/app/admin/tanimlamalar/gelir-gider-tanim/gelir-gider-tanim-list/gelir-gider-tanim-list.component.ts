import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { GelirGiderTanimi } from '../gelir-gider-tanim.model';
import { GelirGiderTanimService } from '../gelir-gider-tanim.service';

@Component({
  selector: 'app-gelir-gider-tanim-list',
  templateUrl: './gelir-gider-tanim-list.component.html',
  styleUrls: ['./gelir-gider-tanim-list.component.scss']
})
export class GelirGiderTanimListComponent extends BaseListComponent<GelirGiderTanimi> implements OnInit {
  columns: any[];
  constructor(service: GelirGiderTanimService) {
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
      key: 'hareketTipi',
      name: 'Hareket Tipi',
      type: 'select',
      editorOptions: {
        items: [{ id: 1, name: 'Gelir' }, { id: 2, name: 'Gider' }, { id: 3, name: 'Gelir/Gider' }],
        displayExpr: 'name',
        valueExpr: 'id'
      }
    }
    ];
  }
}
