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
  btnOdeInstance: any;
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
        visible: true,
        onInitialized: (args: any) => {
          this.btnOdeInstance = args.component;
          console.log(args)
        }
      },

    });
  }
  openOdeModal(e) {
    this.popupVisible = true;
    let modalRef = this.modal.open(TahakkukOdeComponent, { size: 'xl' });
    modalRef.componentInstance.selectedTahakkuks = this.grid.instance.getSelectedRowsData().filter(d => d.durumu === AidatDurumu.Odenmedi);
    modalRef.result.then(() => {
      this.grid.instance.refresh();
    })
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
  onSelectionChanged(e) {
    console.log(e)
    let odenmemislerLength = this.grid.instance.getSelectedRowsData().filter(d => d.durumu === AidatDurumu.Odenmedi).length;
    let uniqueKisi = [...new Set(this.grid.instance.getSelectedRowsData().map(d=>d.meskenKisiId))]
    this.btnOdeInstance.option({
      disabled: !(odenmemislerLength && uniqueKisi.length === 1)
    })
  }
}

