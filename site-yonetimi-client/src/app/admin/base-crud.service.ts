import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseReadOnlyService } from './base-read-only.service';
import { environment } from '../../environments/environment';

export abstract class BaseCrudService extends BaseReadOnlyService {
    constructor(httpClient: HttpClient,
        path: string, baseUrl: string = environment.apiUrl) {
        super(httpClient, path, baseUrl);
    }

    add<T>(data: T): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${this.path}`, data);
    }
    update<T>(id: any, data: T): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${this.path}/${id}`, data);
    }
    patch<T>(id: any, data: any): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}${this.path}/${id}`, data);
    }
    delete<T>(id: any): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${this.path}/${id}`);
    }
}
