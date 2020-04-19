import { Component, OnInit, Injector } from '@angular/core';
import { BaseDetailComponent } from '../../../base-detail.component';
import { Mesken } from '../mesken.model';
import { MeskenService } from '../mesken.service';

@Component({
  selector: 'app-mesken-detay',
  templateUrl: './mesken-detay.component.html',
  styleUrls: ['./mesken-detay.component.scss']
})
export class MeskenDetayComponent extends BaseDetailComponent<Mesken, MeskenService> {
  constructor(injector: Injector) {
    super(MeskenService, injector, Mesken);
  }
}