
import CustomStore from 'devextreme/data/custom_store';
import { OnInit } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { map } from 'rxjs/operators';
export abstract class BaseListComponent<T> implements OnInit {
    settings: any = {};
    public hiddenColumns: Array<string> = new Array<string>('id');
    dataSource: CustomStore;
    constructor(protected service: BaseCrudService,
        private classReference: new () => T = null) {
        this.settings.allowEdit = true;
        this.settings.allowCreate = true;
        this.settings.allowDelete = true;
    }

    ngOnInit() {
        this.dataSource = new CustomStore({
            key: 'id',
            loadMode: 'raw',
            load: () => {
                return this.service.getList(this.classReference).toPromise();
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
    getList(odataQs: string = ''): any {
        return this.service.getList(this.classReference, odataQs).pipe(map(res => res.items));
    }
    onRowUpdating(options) {
        options.newData = Object.assign({}, options.oldData, options.newData);
    }
}