import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { KurulUyeService } from '../kurul-uye.service';
import { KurulUye } from '../kurul-uye.model';

@Component({
  selector: 'app-kurul-uye-list',
  templateUrl: './kurul-uye-list.component.html',
  styleUrls: ['./kurul-uye-list.component.scss']
})
export class KurulUyeListComponent extends BaseListComponent<KurulUye> implements OnInit {
  columns: any[];
  constructor(service: KurulUyeService, injector: Injector) {
    super(service, injector, KurulUye);
  }
}
