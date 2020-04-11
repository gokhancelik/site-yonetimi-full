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