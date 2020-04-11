import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blok } from '../blok.model';
import { SiteService } from '../../site/site.service';
import { BlokService } from '../blok.service';
import { BaseDetailComponent } from '../../../base-detail.component';

@Component({
  selector: 'app-blok-detay',
  templateUrl: './blok-detay.component.html',
  styleUrls: ['./blok-detay.component.scss']
})
export class BlokDetayComponent extends BaseDetailComponent<Blok, BlokService> {

  constructor(injector: Injector) {
    super(BlokService, injector, Blok);
  }

}