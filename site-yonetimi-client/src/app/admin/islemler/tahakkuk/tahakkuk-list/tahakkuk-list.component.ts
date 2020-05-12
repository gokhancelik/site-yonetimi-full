import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahakkukModel, AidatDurumu } from '../tahakkuk-model';
import { TahakkukService } from '../tahakkuk-service';
import { DxDataGridComponent } from 'devextreme-angular';
import { HesapTanimiService } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { HesapTanimi } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.model';
import { BorcDurumu } from '../../borc/borc.model';
import { TahsilatService } from '../../tahsilat/tahsilat-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { TahakkukOdeComponent } from '../tahakkuk-ode/tahakkuk-ode.component';

@Component({
  selector: 'app-tahakkuk-list',
  templateUrl: './tahakkuk-list.component.html',
  styleUrls: ['./tahakkuk-list.component.scss']
})
export class TahakkukListComponent extends BaseListComponent<TahakkukModel> implements OnInit {
  grid: DxDataGridComponent;
  popupVisible: boolean;
  hesapTanimlari: HesapTanimi[];
  constructor(service: TahakkukService,
    hesapTanimiService: HesapTanimiService,
    private modal: NgbModal,
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
    let modalRef = this.modal.open(TahakkukOdeComponent, { size: 'xl' });
    modalRef.componentInstance.selectedTahakkuks = this.grid.instance.getSelectedRowsData().filter(d => d.durumu === AidatDurumu.Odenmedi);

  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }

}

