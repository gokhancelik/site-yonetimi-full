import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahakkukModel, AidatDurumu } from '../tahakkuk-model';
import { TahakkukService } from '../tahakkuk-service';
import { DxDataGridComponent } from 'devextreme-angular';
import { HesapTanimiService } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapTanimi } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.model';
import { BorcDurumu } from '../../borc/borc.model';
import { TahsilatService } from '../../tahsilat/tahsilat-service';

@Component({
  selector: 'app-tahakkuk-list',
  templateUrl: './tahakkuk-list.component.html',
  styleUrls: ['./tahakkuk-list.component.scss']
})
export class TahakkukListComponent extends BaseListComponent<TahakkukModel> implements OnInit {
  grid: DxDataGridComponent;
  popupVisible: boolean;
  hesapHareketi: { tutar?: number, odemeTarihi?: Date, hesapId?: string } = {};
  hesapTanimlari: HesapTanimi[];
  selectedTahakkuks: TahakkukModel[];
  constructor(service: TahakkukService,
    hesapTanimiService: HesapTanimiService,
    private tahsilatService: TahsilatService,
    injector: Injector) {
    super(service, injector, TahakkukModel);
    hesapTanimiService.getList<HesapTanimi>()
      .subscribe(d => {
        this.hesapTanimlari = d;
      });
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'fa fa-credit-card',
        hint: 'Öde',
        onClick: this.openOdeModal.bind(this),
        visible: true
      },
    });
  }
  openOdeModal(e) {
    this.popupVisible = true;
    this.selectedTahakkuks = this.grid.instance.getSelectedRowsData().filter(d => d.durumu === AidatDurumu.Odenmedi);
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
  ode(e) {
    if (this.selectedTahakkuks && this.selectedTahakkuks.length) {
      (this.tahsilatService).ode(this.selectedTahakkuks.map(d => d.id), this.hesapHareketi)
        .subscribe(d => {
          this.popupVisible = false;
          this.grid.instance.refresh();
        })
    }

  }
}

