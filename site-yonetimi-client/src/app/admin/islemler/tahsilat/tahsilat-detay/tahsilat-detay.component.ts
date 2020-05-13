import { Component, OnInit, Injector } from '@angular/core';
import { TahsilatService } from '../tahsilat-service';
import { BaseDetailComponent } from '../../../base-detail.component';
import { TahsilatModel } from '../tahsilat-model';

@Component({
  selector: 'app-tahsilat-detay',
  templateUrl: './tahsilat-detay.component.html',
  styleUrls: ['./tahsilat-detay.component.scss']
})
export class TahsilatDetayComponent extends BaseDetailComponent<TahsilatModel, TahsilatService> {
  constructor(injector: Injector) {

    super(TahsilatService, injector, TahsilatModel);
  }
}