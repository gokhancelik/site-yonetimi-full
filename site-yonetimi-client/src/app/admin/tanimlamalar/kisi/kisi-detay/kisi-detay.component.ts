import { Component, OnInit, Injector } from '@angular/core';
import { Kisi } from '../kisi.model';
import { KisiService } from '../kisi.service';
import { BaseDetailComponent } from '../../../base-detail.component';
import { KisiCuzdan } from '../../../islemler/services/odeme-islemleri.service';

@Component({
  selector: 'app-kisi-detay',
  templateUrl: './kisi-detay.component.html',
  styleUrls: ['./kisi-detay.component.scss']
})
export class KisiDetayComponent extends BaseDetailComponent<Kisi, KisiService> implements OnInit {
  cuzdan: number;
  constructor(injector: Injector, private kisiService: KisiService) {
    super(KisiService, injector, Kisi);
  }
  ngOnInit() {
    this.kisiService.getCuzdan(this.id)
      .subscribe(d => {
        this.cuzdan = d && d.length ? d.map(m => m.tutar).reduce((p, c) => p + c) : 0;
      })
  }
}
