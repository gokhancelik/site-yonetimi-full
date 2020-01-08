import { Component, OnInit } from '@angular/core';
import { FaizGrubu } from '../faiz-grubu.model';
import { FaizGrubuService } from '../faiz-grubu.service';
import { BaseListComponent } from 'src/app/admin/base-list.component';

@Component({
  selector: 'app-faiz-grubu-list',
  templateUrl: './faiz-grubu-list.component.html',
  styleUrls: ['./faiz-grubu-list.component.scss']
})
export class FaizGrubuListComponent extends BaseListComponent<FaizGrubu> implements OnInit {
  columns: any[];
  constructor(service: FaizGrubuService) {
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
      key: 'oran',
      name: 'Oran',
      type: 'number',
      visible: true,
      format: {
        type: 'percent',
        precision: 2
      },
      editorOptions: {
        format: {
          type: 'percent',
          precision: 2
        },
      },
    }];
  }
}
