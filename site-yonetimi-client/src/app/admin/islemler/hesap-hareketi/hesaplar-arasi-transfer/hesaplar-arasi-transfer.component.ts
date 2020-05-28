import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HesapTanimiService } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapTanimi } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.model';
import { HesapHareketleriService } from '../hesap-hareketi.service';

@Component({
  selector: 'app-hesaplar-arasi-transfer',
  templateUrl: './hesaplar-arasi-transfer.component.html',
  styleUrls: ['./hesaplar-arasi-transfer.component.scss']
})
export class HesaplarArasiTransferComponent implements OnInit {
  dto: { fromHesapId?: string, toHesapId?: string, islemTarihi?: Date, tutar?: number } = {}
  hesapTanimlari: HesapTanimi[];
  constructor(
    private hesapTanimiService: HesapTanimiService,
    private hesapHareketleriService: HesapHareketleriService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.hesapTanimiService.getList<HesapTanimi>()
      .subscribe(d => {
        this.hesapTanimlari = d;
      });
  }
  transfer() {
    this.hesapHareketleriService.transfer(this.dto)
      .subscribe(d => {
        this.activeModal.close(true);
      })
  }
}
