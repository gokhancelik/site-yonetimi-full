import { Component, OnInit, Injector, Input } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { Borc, BorcDurumu } from '../borc.model';
import { BorcService } from '../borc.service';
import { HesapTanimi } from 'src/app/admin/tanimlamalar/hesap-tanimi/hesap-tanimi.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { HesapTanimiService } from 'src/app/admin/tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { TahakkukService } from '../../tahakkuk/tahakkuk-service';
import { FaizGrubu } from 'src/app/admin/tanimlamalar/faiz-grubu/faiz-grubu.model';
import { FaizGrubuService } from 'src/app/admin/tanimlamalar/faiz-grubu/faiz-grubu.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-borc-list',
  templateUrl: './borc-list.component.html',
  styleUrls: ['./borc-list.component.scss']
})
export class BorcListComponent extends BaseListComponent<Borc> implements OnInit {
  @Input() firmaId;
  columns: any[];
  hesaptanimi: any = {};
  hesapTanimlari: HesapTanimi[];
  selectedBorc: Borc;
  hesapHareketi: { tutar?: number, odemeTarihi?: Date, hesapId?: string } = {};
  borc: { tutar?: number, vadeTarihi?: Date, faizGrubuId?: string} = {};
  faizGruplari: FaizGrubu[];
  grid: DxDataGridComponent;
  borcId: string;
  popupVisibleOde = false;
  popupVisibleTahakkuk = false;

  constructor(private _service: BorcService,
    private hesapTanimiService: HesapTanimiService,
    private tahakkukService: TahakkukService,
    private faizGrupService: FaizGrubuService,
    injector: Injector) {
    super(_service, injector, Borc);

    this.hesapTanimiService.getList<HesapTanimi>()
      .subscribe(d => {
        this.hesapTanimlari = d;
      });

    this.faizGrupService.getList<FaizGrubu>()
    .subscribe(d => {
      this.faizGruplari = d;
    });
  }
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.firmaId) {
          return this._service.getBorcByFirmaId(this.firmaId).toPromise();
        }
        else{
          return this._service.getList().toPromise();
        }
      },
      insert: (values) => {
        return this.service.add(values).toPromise();
      },
      update: (key, values) => {
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
        icon: 'fa fa-credit-card',
        hint: 'Öde',
        onClick: this.createHesapHareketiOpenModal.bind(this),
        visible: true
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'fa fa-save',
        hint: 'Tahakkuk Oluştur',
        onClick: this.tahakkukOlusturModal.bind(this),
        visible: true
      },
    }
    );
  }

  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }

  createHesapHareketiOpenModal(e) {
    this.selectedBorc = this.grid.instance.getSelectedRowsData()[0];
    this.popupVisibleOde = this.selectedBorc && !(this.selectedBorc.durumu === BorcDurumu.Odendi);
  }

  tahakkukOlusturModal(e) {
    this.borc = {...this.grid.instance.getSelectedRowsData()[0]};
    this.selectedBorc = this.grid.instance.getSelectedRowsData()[0];
    this.popupVisibleTahakkuk = this.borc && !(this.selectedBorc.tahakkukOlusturulduMu === true);
  }

  ode(e) {
    (this._service as BorcService).ode(this.selectedBorc.id, this.hesapHareketi)
      .subscribe(d => {
        this.popupVisibleOde = false;
        this.grid.instance.refresh();
      })
  }
  tahakkuklariOlustur(e){
    (this.tahakkukService as TahakkukService).tahakkuklariOlustur(this.selectedBorc.id, this.borc)
      .subscribe(d => {
        console.log(d);
        this.popupVisibleTahakkuk = false;
        this.grid.instance.refresh();
      })
  }
  onInitNewRow(e) {
    if(this.firmaId){
      (e.data as Borc).firmaId = this.firmaId;
    }
  }
}
