import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BagimsizBolum } from '../bagimsiz-bolum.model';
import { BagimsizBolumService } from '../bagimsiz-bolum.service';
import { BlokService } from '../../blok/blok.service';
import { BaseDetailComponent } from '../../../base-detail.component';

@Component({
  selector: 'app-bagimsiz-bolum-detay',
  templateUrl: './bagimsiz-bolum-detay.component.html',
  styleUrls: ['./bagimsiz-bolum-detay.component.scss']
})
export class BagimsizBolumDetayComponent extends BaseDetailComponent<BagimsizBolum, BagimsizBolumService> {

  constructor(injector: Injector) {
    super(BagimsizBolumService, injector, BagimsizBolum);
  }


}
