import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { Firma } from '../firma.model';
import { FirmaService } from '../firma.service';

@Component({
  selector: 'app-firma-list',
  templateUrl: './firma-list.component.html',
  styleUrls: ['./firma-list.component.scss']
})
export class FirmaListComponent extends BaseListComponent<Firma> implements OnInit {
  columns: any[];
  constructor(service: FirmaService, injector: Injector) {
    super(service, injector, Firma);
  }
}
