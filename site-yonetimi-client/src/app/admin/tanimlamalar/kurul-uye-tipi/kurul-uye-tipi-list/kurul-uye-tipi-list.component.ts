import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { KurulUyeTipi } from '../kurul-uye-tipi.model';
import { KurulUyeTipiService } from '../kurul-uye-tipi.service';

@Component({
  selector: 'app-kurul-uye-tipi-list',
  templateUrl: './kurul-uye-tipi-list.component.html',
  styleUrls: ['./kurul-uye-tipi-list.component.scss']
})
export class KurulUyeTipiListComponent extends BaseListComponent<KurulUyeTipi> implements OnInit {
  columns: any[];
  constructor(service: KurulUyeTipiService, injector: Injector) {
    super(service, injector, KurulUyeTipi);
  }
}
