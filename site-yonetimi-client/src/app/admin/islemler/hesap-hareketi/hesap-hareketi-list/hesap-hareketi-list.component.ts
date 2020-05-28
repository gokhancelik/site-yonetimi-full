import { Component, OnInit, Injector } from '@angular/core';
import { HesapHareketleriService } from '../hesap-hareketi.service';
import { HesapHareketi } from '../hesap-hareketi.model';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import CustomStore from 'devextreme/data/custom_store';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HesaplarArasiTransferComponent } from '../hesaplar-arasi-transfer/hesaplar-arasi-transfer.component';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-hesap-hareketi-list',
  templateUrl: './hesap-hareketi-list.component.html',
  styleUrls: ['./hesap-hareketi-list.component.scss']
})
export class HesapHareketiListComponent extends BaseListComponent<HesapHareketi> implements OnInit {
  grid: DxDataGridComponent;
  constructor(service: HesapHareketleriService,
    private modal: NgbModal,
    private injector: Injector) {
    super(service, injector, HesapHareketi);
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return (this.service as HesapHareketleriService).getListWithInnerModel().toPromise();
      },
      insert: (values) => {
        console.log(values)
        return this.service.add(values).toPromise();
      },
      update: (key, values) => {
        console.log(values)
        return this.service.update(key, values).toPromise();
      },
      remove: (key) => {
        return this.service.delete(key).toPromise();
      },
    });
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'upload',
        hint: 'Hesap Hareketi Yükle',
        onClick: () => this.injector.get(Router).navigate(['/admin', 'islemler', 'hesap-hareketi', 'hesap-hareketi-yukle']),
        visible: true
      }
    });
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'fa fa-exchange-alt',
        hint: 'Para Transferi',
        onClick: () => {
          let modalRef = this.modal.open(HesaplarArasiTransferComponent, { size: 'md' });
          modalRef.result.then(() => {
            this.grid.instance.refresh();
          })
        },
        visible: true,
      },
    });
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
}
