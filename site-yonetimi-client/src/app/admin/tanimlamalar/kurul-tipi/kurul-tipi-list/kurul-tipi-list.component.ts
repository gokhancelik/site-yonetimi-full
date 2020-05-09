import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { KurulTipi } from '../kurul-tipi.model';
import { KurulTipiService } from '../kurul-tipi.service';

@Component({
  selector: 'app-kurul-tipi-list',
  templateUrl: './kurul-tipi-list.component.html',
  styleUrls: ['./kurul-tipi-list.component.scss']
})
export class KurulTipiListComponent extends BaseListComponent<KurulTipi> implements OnInit {
  columns: any[];
  constructor(service: KurulTipiService, injector: Injector) {
    super(service, injector, KurulTipi);
  }
}
