import { Component, OnInit, Injector, Input } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { HesapHareketi } from '../hesap-hareketi.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { HesapHareketleriService } from '../hesap-hareketi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HesapTanimiService } from '../../../tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import CustomStore from 'devextreme/data/custom_store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HesapHareketiIsleComponent } from '../hesap-hareketi-isle/hesap-hareketi-isle.component';

@Component({
  selector: 'app-islenmemis-hesap-hareketi-list',
  templateUrl: './islenmemis-hesap-hareketi-list.component.html',
  styleUrls: ['./islenmemis-hesap-hareketi-list.component.scss']
})
export class IslenmemisHesapHareketiListComponent extends BaseListComponent<HesapHareketi> implements OnInit {
  grid: DxDataGridComponent;
  remoteOperations: boolean = false;
  @Input() hesapTanimiId: string;
  constructor(service: HesapHareketleriService,
    private modal: NgbModal,
    private hesapTanimiService: HesapTanimiService,
    private injector: Injector) {
    super(service, injector, HesapHareketi);
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => {
        return (this.service as HesapHareketleriService).getIslenmemisTahsilatlar({})
          .pipe(map(data => {
            return {
              data: data
            }
          })).toPromise();
      },
      update: (key, values) => {
        return this.service.update(key, values).toPromise();
      },
    });
  }
  onToolbarPreparing(e) {
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
  onEditingStart(e) {
    e.cancel = true;
    let modalReff = this.modal.open(HesapHareketiIsleComponent, {
      size: 'xl'
    });
    modalReff.componentInstance.data = e.data;
    modalReff.result.then(d => {
      this.grid.instance.refresh();
    });
  }
}
