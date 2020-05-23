import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahsilatModel } from '../tahsilat-model';
import { TahsilatService } from '../tahsilat-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tahsilat-list',
  templateUrl: './tahsilat-list.component.html',
  styleUrls: ['./tahsilat-list.component.scss']
})
export class TahsilatListComponent extends BaseListComponent<TahsilatModel> implements OnInit {
  constructor(service: TahsilatService,
    private injector: Injector) {
    super(service, injector, TahsilatModel);
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'upload',
        hint: 'Hesap Hareketi Yükle',
        onClick: () => this.injector.get(Router).navigate(['/admin', 'islemler', 'tahsilat', 'tahsilat-yukle']),
        visible: true
      },
    });
  }
}
