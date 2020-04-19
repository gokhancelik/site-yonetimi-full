import { Component, OnInit, Input, Injector } from '@angular/core';
import { MeskenTipiService } from '../../../sistem-ayarlari/mesken-tipi/mesken-tipi.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { AidatGrubu } from '../../aidat-grubu/aidat-grubu.model';
import { AidatGrubuService } from '../../aidat-grubu/aidat-grubu.service';
import { Mesken } from '../mesken.model';
import { BaseListComponent } from '../../../base-list.component';
import { MeskenService } from '../mesken.service';
import CustomStore from 'devextreme/data/custom_store';
import { MeskenTipiModel } from '../../../sistem-ayarlari/mesken-tipi/mesken-tipi.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mesken-list',
  templateUrl: './mesken-list.component.html',
  styleUrls: ['./mesken-list.component.scss']
})
export class MeskenListComponent extends BaseListComponent<Mesken> implements OnInit {
  columns: any[];
  popupVisible = false;
  isDetay = false;
  bbAidatGrubu: any = {};
  @Input() ustId: string;
  @Input() meskenTipiKod: string;
  grid: DxDataGridComponent;
  aidatGruplari: AidatGrubu[];
  meskenTipi: MeskenTipiModel;
  constructor(private meskenService: MeskenService, injector: Injector,
    private meskenTipiService: MeskenTipiService,
    private activatedRoute: ActivatedRoute,
    private aidatGrubuService: AidatGrubuService) {
    super(meskenService, injector, Mesken);
    this.aidatGrubuService.getList<AidatGrubu>()
      .subscribe(d => {
        this.aidatGruplari = d;
      });
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'upload',
        hint: 'Aidat Grubu Ata',
        onClick: this.assignAidatGrubuOpenModal.bind(this),
        visible: !this.isDetay
      },
    });
  }
  gridReady(e: DxDataGridComponent) {
    this.grid = e;
  }
  assignAidatGrubuOpenModal(e) {
    let selectedBBs = this.grid.selectedRowKeys;
    this.popupVisible = selectedBBs && selectedBBs.length > 0;
  }
  assignAidatGrubu(e, form) {
    let selectedBBs = this.grid.selectedRowKeys;
    for (let i = 0; i < selectedBBs.length; i++) {
      const bb = selectedBBs[i];
      (this.service as MeskenService)
        .assignAidatGrubu(bb, this.bbAidatGrubu)
        .subscribe(d => {
          this.popupVisible = false;
        });
    }
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (d) => {
      this.meskenTipiKod = d['meskenTipi'];
      this.meskenTipi = await this.meskenTipiService.getByKod(this.meskenTipiKod).toPromise();
      this.dataSource = new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
          if (this.ustId) {
            this.isDetay = true;
            return this.meskenService.findByUstId(this.ustId).toPromise();
          }
          else {
            return this.meskenTipiService.getMeskensByKod(this.meskenTipiKod).toPromise();
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
    });

  }
  onInitNewRow(e) {
    (e.data as Mesken).ustId = this.ustId || null;
    (e.data as Mesken).meskenTipiId = this.meskenTipi.id;
  }
}