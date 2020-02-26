import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahsilatModel } from '../tahsilat-model';
import { TahsilatService } from '../tahsilat-service';
import { BagimsizBolumKisiService } from 'src/app/admin/tanimlamalar/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';

@Component({
  selector: 'app-tahsilat-list',
  templateUrl: './tahsilat-list.component.html',
  styleUrls: ['./tahsilat-list.component.scss']
})
export class TahsilatListComponent extends BaseListComponent<TahsilatModel> implements OnInit {
  constructor(service: TahsilatService,
    injector: Injector) {
    super(service, injector,TahsilatModel);
  }
}
