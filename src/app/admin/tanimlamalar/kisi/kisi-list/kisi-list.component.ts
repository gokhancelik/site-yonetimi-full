import { Component, OnInit, Injector } from '@angular/core';
import { Kisi } from '../kisi.model';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { KisiService } from '../kisi.service';

@Component({
  selector: 'app-kisi-list',
  templateUrl: './kisi-list.component.html',
  styleUrls: ['./kisi-list.component.scss']
})
export class KisiListComponent extends BaseListComponent<Kisi> implements OnInit {
  columns: any[];
  constructor(service: KisiService, injector: Injector) {
    super(service, injector, Kisi);
  }
}
