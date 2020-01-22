import { Component, OnInit, ViewChild } from '@angular/core';
import { OdemeService } from '../odeme.service';
import { Tahakkuk } from '../models/tahakkuk.model';
import { Router } from '@angular/router';
import { OnlineIslemlerService } from '../online-islemler.service';
import { Tahsilat } from '../models/tahsilat.model';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OdemeGatewayComponent } from '../odeme-gateway/odeme-gateway.component';

@Component({
  selector: 'app-odeme',
  templateUrl: './odeme.component.html',
  styleUrls: ['./odeme.component.scss']
})
export class OdemeComponent implements OnInit {
  aylar: any[];
  yillar: any[];
  model: any = {
    cardHolderName: 'Gökhan Çelik',
    cardNumber: '4033602562020327',
    cardExpireDateMonth: '01',
    cardExpireDateYear: 2020,
    cardCVV2: '861'
  };
  seciliTahakkuklar: Tahakkuk[];
  tahsilat: Tahsilat;
  sonucUrl: any;
  @ViewChild('iFrameRef', { static: true }) iFrameRef;
  constructor(private odemeService: OdemeService,
    private modalService: NgbModal,
    private onlineIslemlerService: OnlineIslemlerService,
    protected sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {
    this.seciliTahakkuklar = this.odemeService.seciliTahakkuklar;
    if (!this.seciliTahakkuklar || !this.seciliTahakkuklar.length) {
      this.router.navigate(['/online-islemler']);
      return;
    }
    this.aylar = Array.from(Array(12).keys()).map(x => {
      const y = x + 1;
      const id = y > 9 ? y : `0${y}`;
      return {
        id,
        ad: id
      };
    });
    this.yillar = Array.from(Array(10).keys()).map(x => {
      const buYil = new Date().getFullYear();
      return {
        id: buYil + x,
        ad: buYil + x
      };
    });
    this.onlineIslemlerService.tahsilatOlustur(this.seciliTahakkuklar)
      .subscribe(d => {
        console.log(d)
        this.tahsilat = d;
      });
  }
  odemeyiTamamla(e) {
    this.onlineIslemlerService.odeme({ tahsilat: this.tahsilat, creditCard: this.model })
      .subscribe(d => {
        this.sonucUrl = this.transform(d.htmlResponse);
        let odemeModal = this.modalService.open(OdemeGatewayComponent, { size: 'xl' });
        odemeModal.componentInstance.data = this.sonucUrl;
        odemeModal.result.then((res) => {
          console.log(res)
        });
      });
  }
  public transform(value: any) {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(getBlobURL(value, 'text/html'));
  }
}
