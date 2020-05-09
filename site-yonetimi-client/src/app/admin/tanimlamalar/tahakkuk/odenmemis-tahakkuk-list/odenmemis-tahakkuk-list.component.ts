import { Component, OnInit, Injector, Input } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { TahakkukModel } from '../../../islemler/tahakkuk/tahakkuk-model';
import { KisiService } from '../../kisi/kisi.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-odenmemis-tahakkuk-list',
  templateUrl: './odenmemis-tahakkuk-list.component.html',
  styleUrls: ['./odenmemis-tahakkuk-list.component.scss']
})
export class OdenmemisTahakkukListComponent extends BaseListComponent<TahakkukModel> implements OnInit {
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
        return this._service.getOdenmemisTahakkuklar(this.kisiId).toPromise();
      },
    });
  }
}
