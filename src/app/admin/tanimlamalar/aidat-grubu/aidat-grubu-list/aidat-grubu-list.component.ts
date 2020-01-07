import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { AidatGrubu } from '../aidat-grubu.model';
import { AidatGrubuService } from '../aidat-grubu.service';

@Component({
  selector: 'app-aidat-grubu-list',
  templateUrl: './aidat-grubu-list.component.html',
  styleUrls: ['./aidat-grubu-list.component.scss']
})
export class AidatGrubuListComponent extends BaseListComponent<AidatGrubu> implements OnInit {
  columns: any[];
  constructor(service: AidatGrubuService) {
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
      key: 'tutar',
      name: 'Tutar',
      type: 'number',
      visible: true,
      format: {
        type: 'currency',
      },
      editorOptions: {
        format: {
          type: 'currency',
        },
      },
    }];
  }
}
