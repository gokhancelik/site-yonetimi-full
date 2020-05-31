import { Component, OnInit, Injector } from '@angular/core';
import { HesapTanimi } from '../hesap-tanimi.model';
import { HesapTanimiService } from '../hesap-tanimi.service';
import { BaseDetailComponent } from '../../../base-detail.component';

@Component({
  selector: 'app-hesap-tanimi-detay',
  templateUrl: './hesap-tanimi-detay.component.html',
  styleUrls: ['./hesap-tanimi-detay.component.scss']
})
export class HesapTanimiDetayComponent extends BaseDetailComponent<HesapTanimi, HesapTanimiService> {

  constructor(injector: Injector, private service: HesapTanimiService) {
    super(HesapTanimiService, injector, HesapTanimi);
  }
}
