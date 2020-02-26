import { Component, OnInit, Injector } from '@angular/core';
import { TahsilatService } from '../tahsilat-service';
import { BaseDetailComponent } from '../../../base-detail.component';
import { TahsilatModel } from '../tahsilat-model';

@Component({
  selector: 'app-tahsilat-detay',
  templateUrl: './tahsilat-detay.component.html',
  styleUrls: ['./tahsilat-detay.component.scss']
})
export class TahsilatDetayComponent extends BaseDetailComponent<TahsilatModel, TahsilatService> {
  constructor(injector: Injector) {

    super(TahsilatService, injector, TahsilatModel);
    // this.columns = [{
    //   key: 'id',
    //   name: 'Id',
    //   type: 'string',
    //   editorOptions: { readOnly: true },
    //   visible: false,
    // },
    // {
    //   key: 'tahsilatId',
    //   name: 'Tahsilat',
    //   type: 'select',
    //   editorOptions: {
    //     itemsAsync: tahsilatService.getList(),
    //     displayExpr: 'durumu',
    //     valueExpr: 'id',
    //   },
    //   visible: true,
    // },
    // {
    //   key: 'odemeTipiId',
    //   name: 'Ödeme Tipi',
    //   type: 'select',
    //   editorOptions: {
    //     itemsAsync: gelirgiderService.getList(),
    //     displayExpr: 'kod',
    //     valueExpr: 'id',
    //   },
    //   visible: true,
    // },
    // {
    //   key: 'tahakkukId',
    //   name: 'Tahakkuk',
    //   type: 'string',
    //   editorOptions: {
    //     itemsAsync: tahakkukService.getList(),
    //     displayExpr: 'durumu',
    //     valueExpr: 'id',
    //   },
    //   visible: true
    // },
    // {
    //   key: 'tutar',
    //   name: 'Tutar',
    //   type: 'number',
    //   visible: true
    // },
    // ];
  }

  //  ngOnInit() {
  //   this.tahsilatId = this.route.snapshot.params.id;
  //   this.dataSource = new CustomStore({
  //     key: 'id',
  //     loadMode: 'raw',
  //     load: () => {
  //       if (this.tahsilatId) {
  //         return this.tahsilatKalemService.getByTahsilatId(this.tahsilatId).toPromise();
  //       } 
  //       return of([]).toPromise();
  //     },
  //     insert: (values) => {
  //       return this.service.add(values).toPromise();
  //     },
  //     update: (key, values) => {
  //       return this.service.update(key, values).toPromise();
  //     },
  //     remove: (key) => {
  //       return this.service.delete(key).toPromise();
  //     },
  //   });
  //   console.log(this.tahsilatId);
  //   console.log(this.dataSource);
  // }
  // onInitNewRow(e) {
  //   (e.data as TahsilatKalemModel).tahakkukId = this.tahsilatId;
  // }
}