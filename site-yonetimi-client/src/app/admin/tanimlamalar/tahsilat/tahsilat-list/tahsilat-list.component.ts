import { Component, OnInit, Input, Injector } from '@angular/core';
import { TahsilatModel } from '../../../islemler/tahsilat/tahsilat-model';
import { BaseListComponent } from '../../../base-list.component';
import { KisiService } from '../../kisi/kisi.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-kisi-tahsilat-list',
  templateUrl: './tahsilat-list.component.html',
  styleUrls: ['./tahsilat-list.component.scss']
})
export class TahsilatListComponent extends BaseListComponent<TahsilatModel> implements OnInit {
  @Input() kisiId
  columns: any[];
  constructor(private _service: KisiService, injector: Injector) {
    super(_service, injector, TahsilatModel);
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return this._service.getTahsilatlar(this.kisiId).toPromise();
      },
    });
  }
}
