import { Component, OnInit } from '@angular/core';
import { BagimsizBolum } from '../bagimsiz-bolum.model';
import { BaseListComponent } from '../../../base-list.component';
import { BlokService } from '../../blok/blok.service';
import { BagimsizBolumService } from '../bagimsiz-bolum.service';

@Component({
  selector: 'app-bagimsiz-bolum-list',
  templateUrl: './bagimsiz-bolum-list.component.html',
  styleUrls: ['./bagimsiz-bolum-list.component.scss']
})
export class BagimsizBolumListComponent extends BaseListComponent<BagimsizBolum> implements OnInit {
  columns: any[];
  constructor(service: BagimsizBolumService, blokService: BlokService) {
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
      key: 'kod',
      name: 'Kod',
      type: 'string',
      validators: [{
        type: 'required',
        message: 'Kod zorunludur',
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
        valueExpr: 'id'
      },
      visible: true,
    }];
  }
}
