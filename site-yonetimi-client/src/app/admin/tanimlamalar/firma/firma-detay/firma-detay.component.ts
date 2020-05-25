import { Component, OnInit, Injector } from '@angular/core';
import { FirmaService } from '../firma.service';
import { Firma } from '../firma.model';
import { BaseDetailComponent } from 'src/app/admin/base-detail.component';

@Component({
  selector: 'app-firma-detay',
  templateUrl: './firma-detay.component.html',
  styleUrls: ['./firma-detay.component.scss']
})
export class FirmaDetayComponent extends BaseDetailComponent<Firma, FirmaService> implements OnInit {

  constructor(injector: Injector, private firmaService: FirmaService) {
    super(FirmaService, injector, Firma);
  }
  ngOnInit() {
  }
}
