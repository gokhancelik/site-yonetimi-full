import { Component, OnInit } from '@angular/core';
import { OdemeService } from '../odeme.service';
import { Tahakkuk } from '../models/tahakkuk.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odeme',
  templateUrl: './odeme.component.html',
  styleUrls: ['./odeme.component.scss']
})
export class OdemeComponent implements OnInit {
  aylar: any[];
  yillar: any[];
  model: any = {};
  seciliTahakkuklar: Tahakkuk[];
  constructor(private odemeService: OdemeService,
    private router: Router) { }

  ngOnInit() {
    this.seciliTahakkuklar = this.odemeService.seciliTahakkuklar;
    if (!this.seciliTahakkuklar || !this.seciliTahakkuklar.length) {
      this.router.navigate(['/online-islemler']);
      return;
    }
    this.aylar = Array.from(Array(12).keys()).map(x => {
      let y = x + 1;
      let id = y > 9 ? y : `0${y}`;
      return {
        id: id,
        ad: id
      }
    });
    this.yillar = Array.from(Array(10).keys()).map(x => {
      let buYil = new Date().getFullYear();
      return {
        id: buYil + x,
        ad: buYil + x
      }
    });
  }
  odemeyiTamamla(e) {
  }
}
