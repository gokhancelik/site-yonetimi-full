import { Component, OnInit } from '@angular/core';
import { Site } from '../../../../../server/src/site/site.entity';
import { BaseListComponent } from '../../base-list.component';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent extends BaseListComponent<Site> implements OnInit {
  columns: any[];
  constructor(service: SiteService) {
    super(service, Site);
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
    }];
  }
}

