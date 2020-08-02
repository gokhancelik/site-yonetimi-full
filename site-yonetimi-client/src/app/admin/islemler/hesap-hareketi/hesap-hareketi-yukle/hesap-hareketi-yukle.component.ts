import { Component, OnInit, ElementRef, ViewChild, Injector } from '@angular/core';
import { HesapHareketleriService } from '../hesap-hareketi.service';
import { BaseListComponent } from '../../../base-list.component';
import { BankaHesapHareketi } from '../hesap-hareketi.model';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs';

@Component({
  selector: 'app-hesap-hareketi-yukle',
  templateUrl: './hesap-hareketi-yukle.component.html',
  styleUrls: ['./hesap-hareketi-yukle.component.scss']
})
export class HesapHareketiYukleComponent extends BaseListComponent<BankaHesapHareketi> {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  hesapHareketiFile: File;
  topuYukleProgress: number;
  yukleniyor: boolean;
  topluYukleSonucu: any;
  constructor(private _service: HesapHareketleriService,
    private injector: Injector) {
    super(_service, injector, BankaHesapHareketi);
  }

  ngOnInit() {

  }
  dosyaYuklendi(e: FileList) {
    this.hesapHareketiFile = e[0];
    this._service.upload({ data: this.hesapHareketiFile, fileName: this.hesapHareketiFile.name }, 'akbank')
      .subscribe(event => {
        this.topuYukleProgress = 100;
        this.topluYukleSonucu = event;
        this.yukleniyor = false;
        this.dataSource = new CustomStore({
          key: 'dekontNo',
          loadMode: 'raw',
          load: () => {
            return of(this.topluYukleSonucu).toPromise();
          },
        });
      });
  }
  dosyaSil() {
    this.hesapHareketiFile = null;
    this.fileInput.nativeElement.value = '';
  }
  aktar() {
    var i, j, temparray, chunk = 100;
    for (i = 0, j = this.topluYukleSonucu.length; i < j; i += chunk) {
      temparray = this.topluYukleSonucu.slice(i, i + chunk);
      this._service.aktar(temparray)
      .subscribe(d => {

      });
    }
    
  }
}
