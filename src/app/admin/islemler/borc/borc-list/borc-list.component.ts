import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { Borc, BorcDurumu } from '../borc.model';
import { BorcService } from '../borc.service';
import { BlokService } from 'src/app/admin/tanimlamalar/blok/blok.service';
import { GelirGiderTanimService } from 'src/app/admin/tanimlamalar/gelir-gider-tanim/gelir-gider-tanim.service';
import { of } from 'rxjs';
import { HesapTanimi } from 'src/app/admin/tanimlamalar/hesap-tanimi/hesap-tanimi.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { HesapTanimiService } from 'src/app/admin/tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapHareketi, HareketTipi } from '../../hesap-hareketi/hesap-hareketi.model';
import { HesapHareketleriService } from '../../hesap-hareketi/hesap-hareketi.service';
import { TahsilatService } from 'server/src/tahsilat/tahsilat.service';

@Component({
  selector: 'app-borc-list',
  templateUrl: './borc-list.component.html',
  styleUrls: ['./borc-list.component.scss']
})
export class BorcListComponent extends BaseListComponent<Borc> implements OnInit {
  columns: any[];
  hesaptanimi: any = {};
  hesapTanimlari: HesapTanimi[];
  selectedRowData: Borc;
  hesapHareketi: HesapHareketi = new HesapHareketi();
  grid: DxDataGridComponent;
  borcId: string;
  popupVisible = false;

  constructor(service: BorcService,
    blokService: BlokService,
    gelirGiderTanimService: GelirGiderTanimService,
    private hesapTanimiService: HesapTanimiService,
    private hesapHareketiService: HesapHareketleriService,
    injector: Injector) {
    super(service, injector, Borc);

    this.hesapTanimiService.getList<HesapTanimi>()
      .subscribe(d => {
        this.hesapTanimlari = d;
      });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'upload',
        hint: 'Öde',
        onClick: this.createHesapHareketiOpenModal.bind(this),
        visible: true
      },
    });
  }

  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }

  createHesapHareketiOpenModal(e) {
    let selectedBBs = this.grid.selectedRowKeys;
    this.selectedRowData = this.grid.instance.getSelectedRowsData()[0];
    this.popupVisible = selectedBBs && selectedBBs.length > 0 && this.selectedRowData && !(this.selectedRowData.durumu === BorcDurumu.Odendi);
  }
  hesapHareketiValidator(e, form) {
    let selectedBBs = this.grid.selectedRowKeys;
    this.selectedRowData = this.grid.instance.getSelectedRowsData()[0];

    const odenenTutar = this.selectedRowData.odenenTutar ? this.selectedRowData.odenenTutar : 0;
    const toplamTutar = this.selectedRowData.tutar;
    const islemTutarı = Number(this.hesapHareketi.tutar);

    if (islemTutarı + odenenTutar > toplamTutar) {
      return false;
    }
    else if (islemTutarı + odenenTutar === toplamTutar) {
      this.selectedRowData.odenenTutar = toplamTutar;
      this.selectedRowData.durumu = BorcDurumu.Odendi;
    }
    else {
      this.selectedRowData.odenenTutar += islemTutarı;
    }
    this.createHesapHareketi(this.hesapHareketi, this.selectedRowData.id);
    this.updateBorc(this.selectedRowData);
  }

  createHesapHareketi(hesapHareketi: HesapHareketi, borcId: string) {
    this.hesapHareketi.borcId = borcId;
    this.hesapHareketi.tutar = -this.hesapHareketi.tutar;
    this.hesapHareketi.hareketTipi = HareketTipi.Gider;
    this.hesapHareketiService.add(this.hesapHareketi).subscribe(d => { this.popupVisible = false; });
  }
  updateBorc(borc: Borc) {
    (this.service as BorcService).update(borc.id, borc).toPromise();
  }
}
