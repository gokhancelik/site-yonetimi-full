import { Component, OnInit } from '@angular/core';
import { OnlineIslemlerService } from '../online-islemler.service';
import { ActivatedRoute } from '@angular/router';
import { TahsilatSanalPosLog } from '../models/tahsilat-sanal-pos-log.model';

@Component({
  selector: 'app-odeme-sonucu',
  templateUrl: './odeme-sonucu.component.html',
  styleUrls: ['./odeme-sonucu.component.scss']
})
export class OdemeSonucuComponent implements OnInit {
  durum: 'basarili' | 'hatali';
  sonuc: TahsilatSanalPosLog;
  mesaj: any;

  constructor(private onlineIslemlerService: OnlineIslemlerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.durum = this.route.snapshot.params['durum'];
    // this.sonucId = this.route.snapshot.queryParams['sonucId'];
    this.onlineIslemlerService.getSonSanalPosLog(this.durum)
      .subscribe(d => {
        this.sonuc = d;
        this.mesaj = JSON.parse(this.sonuc.mesaj) || this.sonuc.mesaj;
      })
  }

}
