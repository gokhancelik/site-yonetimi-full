import { Component, OnInit, Injector, Input } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { KurulUyeService } from '../kurul-uye.service';
import { KurulUye } from '../kurul-uye.model';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs';

@Component({
  selector: 'app-kurul-uye-list',
  templateUrl: './kurul-uye-list.component.html',
  styleUrls: ['./kurul-uye-list.component.scss']
})
export class KurulUyeListComponent extends BaseListComponent<KurulUye> implements OnInit {
  @Input() meskenId;
  @Input() kisiId;
  title: string;
  columns: any[];
  constructor(private _service: KurulUyeService, injector: Injector) {
    super(_service, injector, KurulUye);
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.kisiId) {
          this.title = "Kişi Listesi";
          return this._service.getByKisiId(this.kisiId).toPromise();
        } else if (this.meskenId) {
          this.title = "Bağımsız Bölüm Listesi";
          return this._service.getByMeskenId(this.meskenId).toPromise();
        }
        else{
          return this._service.getList().toPromise();
        }
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
    if(this.meskenId){
      (e.data as KurulUye).meskenId = this.meskenId;
    }
    if(this.kisiId){
      (e.data as KurulUye).kisiId = this.kisiId;
    }
  }
}

