import { Component, OnInit, Input } from '@angular/core';
import { HesapHareketi } from '../hesap-hareketi.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeskenKisiService } from '../../../tanimlamalar/mesken-kisi/mesken-kisi.service';
import { Observable } from 'rxjs';
import { MeskenKisi } from '../../../tanimlamalar/mesken-kisi/mesken-kisi.model';
import { TahakkukModel } from '../../tahakkuk/tahakkuk-model';
import { TahsilatOlusturDto } from '../../services/odeme-islemleri.service';
import { OdemeYontemi } from '../../tahsilat/tahsilat-model';

@Component({
  selector: 'app-hesap-hareketi-isle',
  templateUrl: './hesap-hareketi-isle.component.html',
  styleUrls: ['./hesap-hareketi-isle.component.scss']
})
export class HesapHareketiIsleComponent implements OnInit {
  @Input() public data: HesapHareketi;
  selectedTahakkuks: TahakkukModel[];
  tahsilatOlusturDto: TahsilatOlusturDto = { odemeYontemi: OdemeYontemi.HavaleEFT };
  hareketTipi: 'tahsilat' | 'borc';
  dto: { meskenKisiId?: string, hesapHareketiId?: string } = {}
  meskenKisiList: MeskenKisi[];
  constructor(
    public activeModal: NgbActiveModal,
    private meskenKisiService: MeskenKisiService,

  ) { }

  ngOnInit(): void {
    this.dto.hesapHareketiId = this.data.id;
    this.meskenKisiService.getAllWithKisi().subscribe(d => {
      this.meskenKisiList = d;
      let tryfind = this.meskenKisiList.find(p => this.data.aciklama.includes(p.mesken.kod) || (this.data.aciklama.includes(p.kisi.ad) && this.data.aciklama.includes(p.kisi.soyad)))
      if (tryfind) {
        this.dto.meskenKisiId = tryfind.id;
        this.meskenKisiIdChanged(this.dto.meskenKisiId);
      }
    });
    this.hareketTipi = this.data.tutar > 0 ? 'tahsilat' : 'borc';
    this.tahsilatOlusturDto.odemeTarihi = new Date(this.data.islemTarihi);
    this.tahsilatOlusturDto.tutar = this.data.tutar;
    this.tahsilatOlusturDto.hesapId = this.data.hesapTanimiId;
  }
  kaydet() {
    console.log(this.dto);
  }
  meskenKisiIdChanged(e) {
    this.meskenKisiService.getOdenmemisTahakkuklar(e)
      .subscribe(d => {
        this.selectedTahakkuks = d;
      });
  }
}
