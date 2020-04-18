import { Component, OnInit, Injector } from '@angular/core';
import { SanalPos } from '../sanal-pos.model';
import { SanalPosService } from '../sanal-pos.service';
import { BaseListComponent } from 'src/app/admin/base-list.component';

@Component({
  selector: 'app-sanal-pos-list',
  templateUrl: './sanal-pos-list.component.html',
  styleUrls: ['./sanal-pos-list.component.scss']
})
export class SanalPosListComponent extends BaseListComponent<SanalPos> implements OnInit {
  columns: any[];
  constructor(service: SanalPosService, injector: Injector) {
    super(service, injector, SanalPos);
  }
}
