import { Component, OnInit, Input } from '@angular/core';
import { TahakkukModel } from '../tahakkuk-model';
import { TahsilatService } from '../../tahsilat/tahsilat-service';
import { TahakkukService } from '../tahakkuk-service';
import { OdemeIslemleriService, TahsilatOlusturDto, TahsilatOlusturSonucuDto, KisiCuzdan } from '../../services/odeme-islemleri.service';
import { TahsilatModel, OdemeYontemi } from '../../tahsilat/tahsilat-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HesapTanimiService } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapTanimi } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.model';
import { KisiService } from '../../../tanimlamalar/kisi/kisi.service';
import { MeskenKisiService } from '../../../tanimlamalar/mesken-kisi/mesken-kisi.service';

@Component({
  selector: 'app-tahakkuk-ode',
  templateUrl: './tahakkuk-ode.component.html',
  styleUrls: ['./tahakkuk-ode.component.scss']
})
export class TahakkukOdeComponent implements OnInit {
  @Input() selectedTahakkuks: TahakkukModel[];
  @Input() tahsilatOlusturDto: TahsilatOlusturDto = { odemeYontemi: OdemeYontemi.HavaleEFT, odemeTarihi: new Date(), tutar: 0 };
  @Input() hesapHareketiId: string;
  inputsDisabled;
  tahsilatSonucu: TahsilatOlusturSonucuDto;
  hesapTanimlari: HesapTanimi[];
  seciliTahakkukToplami: number;
  cuzdan: KisiCuzdan;
  constructor(private service: TahakkukService,
    hesapTanimiService: HesapTanimiService,
    private tahsilatService: TahsilatService,
    private neskenKisiService: MeskenKisiService,
    private odemeIslemleriService: OdemeIslemleriService,
    public activeModal: NgbActiveModal
  ) {
    hesapTanimiService.getList<HesapTanimi>()
      .subscribe(d => {
        this.hesapTanimlari = d;
      });
  }

  ngOnInit(): void {
    if (this.tahsilatOlusturDto && this.tahsilatOlusturDto.odemeTarihi && this.tahsilatOlusturDto.tutar) {
      this.inputsDisabled = true;
    }
    this.hesapla();
    this.seciliTahakkukToplami = this.selectedTahakkuks.map(p => p.tutar).reduce((p, c) => p + c, 0)
    this.neskenKisiService.getCuzdan(this.selectedTahakkuks[0].meskenKisiId)
      .subscribe(d => {
        this.cuzdan = d;
      })
  }
  hesapla() {
    this.tahsilatOlusturDto.tahakkuks = this.selectedTahakkuks;
    this.odemeIslemleriService.tahsilatOlustur(this.tahsilatOlusturDto)
      .subscribe(d => {
        this.tahsilatSonucu = d;
      });
  }
  ode() {
    if (this.tahsilatSonucu) {
      this.tahsilatSonucu.hesapId = this.tahsilatOlusturDto.hesapId;
      this.tahsilatSonucu.hesapHareketiId = this.hesapHareketiId;
      (this.odemeIslemleriService).tahakkukOde(this.tahsilatSonucu)
        .subscribe(d => {
          this.activeModal.close();
        })
    }
  }
}
