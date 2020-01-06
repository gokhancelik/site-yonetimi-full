import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
    constructor(public http: HttpClient, path: string, baseUrl: string = environment.apiUrl) {
        this.path = path;
        this.baseUrl = baseUrl;
    }
    getList<T>(): Observable<Array<T>> {
        return this.http.get<Array<T>>(`${this.baseUrl}${this.path}`).pipe(map(d => {
            console.log(d);
            return d;
        }));
    }
    get<T>(id: any): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${this.path}/${id}`);
    }
}

