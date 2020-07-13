import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { TahsilatKalemModel } from './tahsilat-kalem-model';
import { Observable } from 'rxjs';
import { TahakkukModel } from '../tahakkuk/tahakkuk-model';
import { TahsilatModel } from './tahsilat-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TahsilatService extends BaseCrudService {
  constructor(http: HttpClient) {
    super(http, 'tahsilat');
  }
  getTahsilatKalems(id: string): Observable<TahsilatKalemModel[]> {
    return this.http.get<TahsilatKalemModel[]>(`${this.baseUrl}${this.path}/${id}/tahsilatKalems`);
  }
  upload(file: { data: File, fileName: string }): Observable<any> {
    const content_ = new FormData();
    if (file !== null && file !== undefined)
      content_.append("file", file.data, file.fileName ? file.fileName : "file");
    return this.http.post<any>(`${this.baseUrl}online-islemler/odemeleri-dagit`, content_).pipe(map(d => {
      return d;
    }));
  }
  getQuery(query): Observable<[Array<TahsilatModel>, number]> {
    return this.http.post<[Array<TahsilatModel>, number]>(`${this.baseUrl}${this.path}/query`, query);
  }
}
