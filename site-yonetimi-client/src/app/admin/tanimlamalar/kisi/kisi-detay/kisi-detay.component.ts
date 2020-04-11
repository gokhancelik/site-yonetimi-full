import { Component, OnInit, Injector } from '@angular/core';
import { BlokService } from '../../blok/blok.service';
import { ActivatedRoute } from '@angular/router';
import { Kisi } from '../kisi.model';
import { KisiService } from '../kisi.service';
import { BaseDetailComponent } from '../../../base-detail.component';

@Component({
  selector: 'app-kisi-detay',
  templateUrl: './kisi-detay.component.html',
  styleUrls: ['./kisi-detay.component.scss']
})
export class KisiDetayComponent extends BaseDetailComponent<Kisi, KisiService> {

  constructor(injector: Injector) {
    super(KisiService, injector, Kisi);
  }


}
