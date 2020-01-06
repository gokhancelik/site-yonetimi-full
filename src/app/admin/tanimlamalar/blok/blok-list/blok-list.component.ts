import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { Blok } from '../blok.model';
import { BlokService } from '../blok.service';
import { SiteService } from '../../site/site.service';

@Component({
  selector: 'app-blok-list',
  templateUrl: './blok-list.component.html',
  styleUrls: ['./blok-list.component.scss']
})
export class BlokListComponent extends BaseListComponent<Blok> implements OnInit {
  columns: any[];
  constructor(service: BlokService, siteService: SiteService) {
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
      validators: [{
        type: 'required',
        message: 'Ad zorunludur',
      }],
      visible: true,
    },
    {
      key: 'siteId',
      name: 'Site',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'Site zorunludur',
      }],
      editorOptions: {
        itemsAsync: siteService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id'
      },
      visible: true,
    }];
  }
}
