import { Component, OnInit } from '@angular/core';
import { TahakkukModel } from '../tahakkuk-model';
import { TahsilatService } from '../../tahsilat/tahsilat-service';
import { TahakkukService } from '../tahakkuk-service';
import { OdemeIslemleriService, TahsilatOlusturDto, TahsilatOlusturSonucuDto } from '../../services/odeme-islemleri.service';
import { TahsilatModel } from '../../tahsilat/tahsilat-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HesapTanimiService } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapTanimi } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.model';

@Component({
  selector: 'app-tahakkuk-ode',
  templateUrl: './tahakkuk-ode.component.html',
  styleUrls: ['./tahakkuk-ode.component.scss']
})
export class TahakkukOdeComponent implements OnInit {
  selectedTahakkuks: TahakkukModel[];
  tahsilatOlusturDto: TahsilatOlusturDto = {};
  tahsilatSonucu: TahsilatOlusturSonucuDto;
  hesapTanimlari: HesapTanimi[];
  constructor(private service: TahakkukService,
    hesapTanimiService: HesapTanimiService,
    private tahsilatService: TahsilatService,
    private odemeIslemleriService: OdemeIslemleriService,
    public activeModal: NgbActiveModal
  ) {
    hesapTanimiService.getList<HesapTanimi>()
      .subscribe(d => {
        this.hesapTanimlari = d;
      });
  }

  ngOnInit(): void {

  }
  hesapla() {
    this.tahsilatOlusturDto.tahakkuks = this.selectedTahakkuks;
    this.odemeIslemleriService.tahsilatOlustur(this.tahsilatOlusturDto)
      .subscribe(d => {
        this.tahsilatSonucu = d;
      });
  }
  ode(e) {
    // if (this.selectedTahakkuks && this.selectedTahakkuks.length) {
    //   (this.odemeIslemleriService).tahakkukOde(this.selectedTahakkuks.map(d => d.id), this.hesapHareketi)
    //     .subscribe(d => {
    //     })
    // }
  }
}
