import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahakkukModel } from '../tahakkuk-model';
import { TahakkukService } from '../tahakkuk-service';

@Component({
  selector: 'app-tahakkuk-list',
  templateUrl: './tahakkuk-list.component.html',
  styleUrls: ['./tahakkuk-list.component.scss']
})
export class TahakkukListComponent extends BaseListComponent<TahakkukModel> implements OnInit {
  constructor(service: TahakkukService,
    injector: Injector) {
    super(service, injector, TahakkukModel);
  }
}

