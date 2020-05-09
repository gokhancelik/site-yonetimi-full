import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
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
    cardExpireDateYear: 2030,
    cardCVV2: '861'
  };
  seciliTahakkuklar: Tahakkuk[];
  sonucUrl: any;
  tutar: number;
  brandNames: { name: string; id: number; }[];
  sonucHtml: SafeHtml;
  get odenecekTutar() {
    return this.seciliTahakkuklar.map(t => t.odenecekTutar)
  }
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
    this.tutar = this.seciliTahakkuklar.map(m => m.odenecekTutar).reduce((p, c) => p + c, 0)
    this.aylar = Array.from(Array(12).keys()).map(x => {
      const y = x + 1;
      const id = y > 9 ? y.toString() : `0${y}`;
      return {
        id,
        ad: id
      };
    });
    this.yillar = Array.from(Array(11).keys()).map(x => {
      const buYil = new Date().getFullYear();
      return {
        id: buYil + x,
        ad: buYil + x
      };
    });
    this.brandNames = [
      { name: 'Visa', id: 100, },
      { name: 'Master Card', id: 200, },
      { name: 'AmericanExpress', id: 300, },
      { name: 'Troy', id: 400, }
    ]
    // this.onlineIslemlerService.tahsilatOlustur(this.seciliTahakkuklar)
    //   .subscribe(d => {
    //     console.log(d)
    //     this.tahsilat = d;
    //   });
  }
  odemeyiTamamla(e) {
    this.onlineIslemlerService.tahsilatOlustur(this.seciliTahakkuklar)
      .subscribe(d => {
        this.onlineIslemlerService.odeme({ tutar: this.tutar, creditCard: this.model, tahsilatId: d.id })
          .subscribe(d => {
            this.sonucUrl = this.transform(d.htmlResponse);
            this.sonucHtml = this.transformHtml(d.htmlResponse);
            // var myWindow = window.open("", "newWindow", "width=500,height=700");
            document.write(d.htmlResponse);
            let form = <HTMLFormElement>document.getElementsByTagName('form')[0];
            form.submit();
            // myWindow.focus();
            // myWindow.opener = window;
            // myWindow.onclose = (e) => {
            //   (console.log(e))
            // }
            // myWindow.onunload = () => {
            //   console.log(myWindow);
            // }
            // var popupTick = setInterval(function () {
            //   if (myWindow.closed) {
            //     clearInterval(popupTick);
            //   }
            // }, 500);
            let odemeModal = this.modalService.open(OdemeGatewayComponent, { size: 'xl' });
            odemeModal.componentInstance.data = this.sonucUrl;
            odemeModal.result.then((res) => {
              console.log(res)
            });
          });
      })

  }
  public transform(value: any) {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(getBlobURL(value, 'text/html'));
  }
  public transformHtml(value: any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Directive({ selector: '[runScripts]' })
export class RunScriptsDirective implements OnInit {
  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    setTimeout(() => { // wait for DOM rendering
      this.reinsertScripts();
    });
  }
  reinsertScripts(): void {
    const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
    const scriptsInitialLength = scripts.length;
    for (let i = 0; i < scriptsInitialLength; i++) {
      const script = scripts[i];
      const scriptCopy = <HTMLScriptElement>document.createElement('script');
      scriptCopy.type = script.type ? script.type : 'text/javascript';
      if (script.innerHTML) {
        scriptCopy.innerHTML = script.innerHTML;
      } else if (script.src) {
        scriptCopy.src = script.src;
      }
      scriptCopy.async = false;
      script.parentNode.replaceChild(scriptCopy, script);
    }
  }
}
