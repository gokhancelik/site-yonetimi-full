
import CustomStore from 'devextreme/data/custom_store';
import { OnInit, Injector, Directive } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { map } from 'rxjs/operators';
@Directive()
export abstract class BaseListComponent<T extends { colDefs(injector?: Injector): any[] }> implements OnInit {
    settings: any = {};
    public hiddenColumns: Array<string> = new Array<string>('id');
    dataSource: CustomStore;
    columns: any;
    constructor(protected service: BaseCrudService, injector: Injector, type: new () => T) {
        this.settings.allowEdit = true;
        this.settings.allowCreate = true;
        this.settings.allowDelete = true;
        this.columns =  new type().colDefs(injector);
    }
    ngOnInit() {
        this.dataSource = new CustomStore({
            key: 'id',
            loadMode: 'raw',
            load: (loadOptions: any) => {
                console.log(loadOptions)
                return this.service.getList().toPromise();
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
    onRowUpdating(options) {
        options.newData = Object.assign({}, options.oldData, options.newData);
    }
}
