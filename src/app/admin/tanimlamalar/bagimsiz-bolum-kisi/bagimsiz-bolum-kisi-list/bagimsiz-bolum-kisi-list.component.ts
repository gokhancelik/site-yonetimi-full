import { Component, OnInit, Input, Injector } from '@angular/core';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi.model';
import { BaseListComponent } from '../../../../admin/base-list.component';
import { BagimsizBolumKisiService } from '../bagimsiz-bolum-kisi.service';
import { BagimsizBolumService } from '../../bagimsiz-bolum/bagimsiz-bolum.service';
import { KisiService } from '../../kisi/kisi.service';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs';

@Component({
  selector: 'app-bagimsiz-bolum-kisi-list',
  templateUrl: './bagimsiz-bolum-kisi-list.component.html',
  styleUrls: ['./bagimsiz-bolum-kisi-list.component.scss']
})
export class BagimsizBolumKisiListComponent extends BaseListComponent<BagimsizBolumKisi> implements OnInit {
  columns: any[];
  popupVisible = false;
  bbAidatGrubu: any = {};
  @Input() bagimsizBolumId: string;
  @Input() kisiId: string;
  title: string;
  constructor(service: BagimsizBolumKisiService,
    private bagimsizBolumService: BagimsizBolumService,
    private kisiService: KisiService,
    injector: Injector) {
    super(service, injector, BagimsizBolumKisi);
  
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.bagimsizBolumId) {
          this.title = "Kişi Listesi";
          return this.bagimsizBolumService.getKisis(this.bagimsizBolumId).toPromise();
        } else if (this.kisiId) {
          this.title = "Bağımsız Bölüm Listesi";
          return this.kisiService.getBagimsizBolums(this.kisiId).toPromise();
        }
        return of([]).toPromise();
      },
      insert: (values) => {
        return this.service.add(values).toPromise();
      },
      update: (key, values) => {
        return this.service.update(key, values).toPromise();
      },
      remove: (key) => {
        return this.service.delete(key).toPromise();
      },
    });
  }
  onInitNewRow(e) {
    (e.data as BagimsizBolumKisi).bagimsizBolumId = this.bagimsizBolumId;
    (e.data as BagimsizBolumKisi).kisiId = this.kisiId;
  }
}
