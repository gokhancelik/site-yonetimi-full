import { Component, OnInit, Injector } from '@angular/core';
import { SiteService } from '../site.service';
import { Site } from '../site.model';
import { BaseListComponent } from '../../../../admin/base-list.component';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent extends BaseListComponent<Site> implements OnInit {
  columns: any[];
  constructor(service: SiteService, injector: Injector) {
    super(service, injector, Site);
  }
}

