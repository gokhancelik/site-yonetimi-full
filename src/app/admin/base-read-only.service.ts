import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { JsonConvert } from 'json2typescript';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


export interface Serializable<T> {
    deserialize(input: Object): T;
}
export abstract class BaseReadOnlyService {

    private _baseUrl: string;
    public get baseUrl(): string {
        return this._baseUrl;
    }
    public set baseUrl(v: string) {
        this._baseUrl = v;
    }

    private _path: string;
    public get path(): string {
        return this._path;
    }
    public set path(v: string) {
        this._path = v;
    }
    constructor(public http: HttpClient,
        path: string, baseUrl: string = environment.apiUrl) {
        this.path = path;
        this.baseUrl = baseUrl;
    }
    getList<T extends Serializable<T> | any>(classReference: new () => T, odataQs: string = ''): Observable<{ items: Array<T>, count: number }> {
        odataQs = odataQs ? '?' + odataQs : '';
        return this.http.get<{ items: Array<T>, count: number }>(`${this.baseUrl}${this.path}${odataQs}`).pipe(
            map(m => {
                const data = { items: m.items.map(p => new classReference().deserialize(p)), count: m.count }
                return data;
            })
        );
    }
    get<T extends Serializable<T>>(id: any, classReference: new () => T): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${this.path}/${id}`).pipe(
            map(m => {
                // const jsonConvert: JsonConvert = new JsonConvert();
                // const data: T = jsonConvert.deserializeObject<T>(m, classReference);
                // return data;
                return new classReference().deserialize(m)
            })
        );
    }
}

