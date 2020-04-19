import { Component, OnInit, Input, Injector } from '@angular/core';
import { MeskenService } from '../../mesken/mesken.service';
import { MeskenKisiService } from '../mesken-kisi.service';
import { KisiService } from '../../kisi/kisi.service';
import { BaseListComponent } from '../../../base-list.component';
import { MeskenKisi } from '../mesken-kisi.model';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs';

@Component({
  selector: 'app-mesken-kisi-list',
  templateUrl: './mesken-kisi-list.component.html',
  styleUrls: ['./mesken-kisi-list.component.scss']
})
export class MeskenKisiListComponent extends BaseListComponent<MeskenKisi> implements OnInit {
  columns: any[];
  popupVisible = false;
  bbAidatGrubu: any = {};
  @Input() meskenId: string;
  @Input() kisiId: string;
  title: string;
  constructor(service: MeskenKisiService,
    private meskenService: MeskenService,
    private kisiService: KisiService,
    injector: Injector) {
    super(service, injector, MeskenKisi);
  
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.meskenId) {
          this.title = "Kişi Listesi";
          return this.meskenService.getKisis(this.meskenId).toPromise();
        } else if (this.kisiId) {
          this.title = "Bağımsız Bölüm Listesi";
          return this.kisiService.getMeskens(this.kisiId).toPromise();
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
    (e.data as MeskenKisi).meskenId = this.meskenId;
    (e.data as MeskenKisi).kisiId = this.kisiId;
  }
}
