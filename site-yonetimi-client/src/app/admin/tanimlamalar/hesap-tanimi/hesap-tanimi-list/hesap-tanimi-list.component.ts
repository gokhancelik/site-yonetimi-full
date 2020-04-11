import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { HesapTanimi } from '../hesap-tanimi.model';
import { HesapTanimiService } from '../hesap-tanimi.service';

@Component({
  selector: 'app-hesap-tanimi-list',
  templateUrl: './hesap-tanimi-list.component.html',
  styleUrls: ['./hesap-tanimi-list.component.scss']
})
export class HesapTanimiListComponent extends BaseListComponent<HesapTanimi> implements OnInit {
  columns: any[];
  constructor(service: HesapTanimiService, injector: Injector) {
    super(service, injector, HesapTanimi);
  }
}
