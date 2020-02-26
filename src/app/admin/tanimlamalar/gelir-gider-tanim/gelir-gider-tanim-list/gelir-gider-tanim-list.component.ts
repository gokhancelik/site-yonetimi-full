import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { GelirGiderTanimi } from '../gelir-gider-tanim.model';
import { GelirGiderTanimService } from '../gelir-gider-tanim.service';

@Component({
  selector: 'app-gelir-gider-tanim-list',
  templateUrl: './gelir-gider-tanim-list.component.html',
  styleUrls: ['./gelir-gider-tanim-list.component.scss']
})
export class GelirGiderTanimListComponent extends BaseListComponent<GelirGiderTanimi> implements OnInit {
  columns: any[];
  constructor(service: GelirGiderTanimService, injector: Injector) {
    super(service, injector, GelirGiderTanimi);
  }
}
