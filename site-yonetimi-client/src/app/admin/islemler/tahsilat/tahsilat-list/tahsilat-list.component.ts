import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { TahsilatModel } from '../tahsilat-model';
import { TahsilatService } from '../tahsilat-service';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { map } from 'rxjs/operators';

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
  ngOnInit() {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'processed',
      load: (loadOptions: any) => {
        console.log(loadOptions)
        
        return (this.service as TahsilatService).getQuery(loadOptions)
          .pipe(map(data => {
            return {
              data: data[0],
              totalCount: data[1],
            }
          })).toPromise();
      }
    });
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
