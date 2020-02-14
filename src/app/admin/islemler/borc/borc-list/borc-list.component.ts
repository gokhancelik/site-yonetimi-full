import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { Borc } from '../borc.model';
import { BorcService } from '../borc.service';
import { BlokService } from 'src/app/admin/tanimlamalar/blok/blok.service';
import { GelirGiderTanimService } from 'src/app/admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-borc-list',
  templateUrl: './borc-list.component.html',
  styleUrls: ['./borc-list.component.scss']
})
export class BorcListComponent extends BaseListComponent<Borc> implements OnInit {
  columns: any[];
  borcDurumlari = [{ id: '0', name: 'Odenmedi' }, { id: '1', name: 'Odendi' }, { id: '2', name: 'Icrada' }];

  constructor(service: BorcService, blokService: BlokService, gelirGiderTanimService: GelirGiderTanimService) {
    super(service);
    this.columns = [{
      key: 'id',
      name: 'Id',
      type: 'string',
      editorOptions: { readOnly: true, visible: true },
      visible: false,
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
        placeholder: 'Para'
      },
    },
    {
      key: 'odenenTutar',
      name: 'Ödenen Tutar',
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
    },
    {
      key: 'durumu',
      name: 'Borç Durumu',
      type: 'select',
      editorOptions: {
        itemsAsync: of(this.borcDurumlari),
        displayExpr: 'name',
        valueExpr: 'id'
      }
    },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'string',
      visible: true,
    },
    {
      key: 'vadeTarihi',
      name: 'Vade Tarihi',
      type: 'date',
      format: 'dd.MM.yyyy',
      validators: [{
        type: 'required',
        message: 'Vade Tarihi zorunludur',
      }],
      editorOptions: {
        type: 'date',
      },
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
    },
    {
      key: 'islemTipiId',
      name: 'İşlem Tipi',
      type: 'select',
      validators: [{
        type: 'required',
        message: 'İşlem Tipi zorunludur',
      }],
      editorOptions: {
        itemsAsync: gelirGiderTanimService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id'
      },
      visible: true,
    }];
  }
}
