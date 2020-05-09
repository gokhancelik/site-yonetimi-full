import { Component, OnInit, Input, Injector } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { TahakkukModel } from '../../../islemler/tahakkuk/tahakkuk-model';
import { KisiService } from '../../kisi/kisi.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-odenmis-tahakkuk-list',
  templateUrl: './odenmis-tahakkuk-list.component.html',
  styleUrls: ['./odenmis-tahakkuk-list.component.scss']
})
export class OdenmisTahakkukListComponent extends BaseListComponent<TahakkukModel> implements OnInit {
  @Input() kisiId
  columns: any[];
  constructor(private _service: KisiService, injector: Injector) {
    super(_service, injector, TahakkukModel);
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return this._service.getOdenmisTahakkuklar(this.kisiId).toPromise();
      },
    });
  }
}