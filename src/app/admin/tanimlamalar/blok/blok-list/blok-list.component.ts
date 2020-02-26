import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { Blok } from '../blok.model';
import { BlokService } from '../blok.service';
import { SiteService } from '../../site/site.service';

@Component({
  selector: 'app-blok-list',
  templateUrl: './blok-list.component.html',
  styleUrls: ['./blok-list.component.scss']
})
export class BlokListComponent extends BaseListComponent<Blok> implements OnInit {
  constructor(service: BlokService, injector: Injector) {
    super(service, injector, Blok);
  }
}
