import { Component, OnInit } from '@angular/core';
import { KisiService } from '../../admin/tanimlamalar/kisi/kisi.service';
import { Kisi } from '../../admin/tanimlamalar/kisi/kisi.model';

@Component({
  selector: 'app-online-islemler',
  templateUrl: './online-islemler.component.html',
  styleUrls: ['./online-islemler.component.scss']
})
export class OnlineIslemlerComponent implements OnInit {
  kisi: Kisi;

  constructor(private kisiService: KisiService) { }

  ngOnInit() {
    this.kisiService.getCurrentUser()
      .subscribe(d => {
        this.kisi = d;
      });
  }

}
