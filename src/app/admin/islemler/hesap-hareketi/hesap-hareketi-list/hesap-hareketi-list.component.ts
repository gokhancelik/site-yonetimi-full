import { Component, OnInit, Injector } from '@angular/core';
import { HesapHareketleriService } from '../hesap-hareketi.service';
import { HesapHareketi } from '../hesap-hareketi.model';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-hesap-hareketi-list',
  templateUrl: './hesap-hareketi-list.component.html',
  styleUrls: ['./hesap-hareketi-list.component.scss']
})
export class HesapHareketiListComponent extends BaseListComponent<HesapHareketi> implements OnInit {
  constructor(service: HesapHareketleriService,
    injector: Injector) {
    super(service, injector, HesapHareketi);
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return (this.service as HesapHareketleriService).getListWithInnerModel().toPromise();
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
