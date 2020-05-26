import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { Duyurular } from '../duyurular.model';
import { DuyurularService } from '../duyurular.service';

@Component({
  selector: 'app-duyurular-list',
  templateUrl: './duyurular-list.component.html',
  styleUrls: ['./duyurular-list.component.scss']
})
export class DuyurularListComponent extends BaseListComponent<Duyurular> implements OnInit {
  columns: any[];
  constructor(service: DuyurularService, injector: Injector) {
    super(service, injector, Duyurular);
  }
}
