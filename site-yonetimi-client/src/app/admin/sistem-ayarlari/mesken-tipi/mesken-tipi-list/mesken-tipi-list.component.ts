import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { MeskenTipiService } from '../mesken-tipi.service';
import { MeskenTipiModel } from '../mesken-tipi.model';

@Component({
  selector: 'app-mesken-tipi-list',
  templateUrl: './mesken-tipi-list.component.html',
  styleUrls: ['./mesken-tipi-list.component.scss']
})
export class MeskenTipiListComponent extends BaseListComponent<MeskenTipiModel> implements OnInit {
  columns: any[];
  constructor(service: MeskenTipiService, injector: Injector) {
    super(service, injector, MeskenTipiModel);
  }
}
