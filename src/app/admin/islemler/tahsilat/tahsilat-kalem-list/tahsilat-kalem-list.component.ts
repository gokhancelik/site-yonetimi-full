import { Component, OnInit, Input, Injector } from '@angular/core';
import { TahsilatService } from '../tahsilat-service';
import { TahsilatKalemModel } from '../tahsilat-kalem-model';
import { BaseListComponent } from '../../../base-list.component';
import { ActivatedRoute } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { of } from 'rxjs';

@Component({
  selector: 'app-tahsilat-kalem-list',
  templateUrl: './tahsilat-kalem-list.component.html',
  styleUrls: ['./tahsilat-kalem-list.component.scss']
})
export class TahsilatKalemListComponent extends BaseListComponent<TahsilatKalemModel> implements OnInit {
  @Input() tahsilatId: string;
  constructor(service: TahsilatService,
    private route: ActivatedRoute,
    injector: Injector) {
    super(service, injector, TahsilatKalemModel);
  }
  ngOnInit() {
    this.tahsilatId = this.route.snapshot.params.id;
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        if (this.tahsilatId) {
          return (this.service as TahsilatService).getTahsilatKalems(this.tahsilatId).toPromise();
        }
        return of([]).toPromise();
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
}
