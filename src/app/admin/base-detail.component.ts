import { BaseCrudService } from './base-crud.service';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';

export abstract class BaseDetailComponent<T extends { colDefs(injector?: Injector): any[] }, U extends BaseCrudService> {
    columns: any[];
    id: string;
    model: T;

    constructor(service: new (...args: any[]) => U,
        injector: Injector,
        type: new () => T) {
        const route = injector.get(ActivatedRoute);
        this.id = route.snapshot.params.id;
        this.columns = new type().colDefs(injector);
        const s = injector.get<U>(service);
        s.get<T>(this.id).subscribe(d => {
            this.model = d;
        });
    }
}