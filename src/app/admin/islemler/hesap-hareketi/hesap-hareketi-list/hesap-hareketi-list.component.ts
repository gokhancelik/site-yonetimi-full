import { Component, OnInit } from '@angular/core';
import { HesapHareketleriService } from '../hesap-hareketi.service';
import { BorcService } from '../../borc/borc.service';
import { HesapHareketi } from '../hesap-hareketi.model';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { of } from 'rxjs';
import { HareketTipi } from '../../../tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.model';
import { isNgTemplate } from '@angular/compiler';
import CustomStore from 'devextreme/data/custom_store';
import { HesapTanimiService } from 'src/app/admin/tanimlamalar/hesap-tanimi/hesap-tanimi.service';

@Component({
  selector: 'app-hesap-hareketi-list',
  templateUrl: './hesap-hareketi-list.component.html',
  styleUrls: ['./hesap-hareketi-list.component.scss']
})
export class HesapHareketiListComponent extends BaseListComponent<HesapHareketi> implements OnInit {
  columns: any[];
  hareketTipi = [{ id: '1', name: 'Gelir' }, { id: '2', name: 'Gider' }, { id: '3', name: 'GelirGider' }];

  constructor(service: HesapHareketleriService, borcService: BorcService, private hesapTanimiService: HesapTanimiService) {
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
      editorOptions: {
        displayExpr: 'tutar',
        placeholder: 'Para'
      },
    },
    {
      key: 'hareketTipi',
      name: 'Hareket Tipi',
      type: 'select',
      editorOptions: {
        itemsAsync: of(this.hareketTipi),
        displayExpr: 'name',
        valueExpr: 'id'
      }
    },
    {
      key: 'islemTarihi',
      name: 'İşlem Tarihi',
      type: 'date',
      format: 'dd.MM.yyyy',
      validators: [{
        type: 'required',
        message: 'İşlem Tarihi zorunludur',
      }],
      editorOptions: {
        type: 'date',
      },
    },
    {
      key: 'hesapTanimiId',
      name: 'Hesap',
      type: 'select',
      editorOptions: {
        itemsAsync: hesapTanimiService.getList(),
        displayExpr: 'ad',
        valueExpr: 'id'  
        },  
      },
    {
      key: 'aciklama',
      name: 'Açıklama',
      type: 'select',
      editorOptions: {
        itemsAsync: service.getListWithInnerModel(),
        displayExpr: (item) => {  
          if (item)  
            return item.borc ? item.borc.aciklama : (item.tahsilat ? item.tahsilat.aciklama : "");  
          else  
              return "";  
        }, 
        valueExpr: 'aciklama'  
        },
        visible: true, 
    }, 
  ];
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
          return  (this.service as HesapHareketleriService).getListWithInnerModel().toPromise();
        },
        insert: (values) => {
            console.log(values)
            return this.service.add(values).toPromise();
        },
        update: (key, values) => {
            console.log(values)
            return this.service.update(key, values).toPromise();
        },
        remove: (key) => {
            return this.service.delete(key).toPromise();
        },
    });
}
}
