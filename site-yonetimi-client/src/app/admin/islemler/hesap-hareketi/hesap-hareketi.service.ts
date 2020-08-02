import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HesapHareketi } from './hesap-hareketi.model';

@Injectable({
  providedIn: 'root'
})
export class HesapHareketleriService extends BaseCrudService {




  constructor(http: HttpClient) {
    super(http, 'hesapHareketi');
  }
  getListWithInnerModel<HesapHareketi>(params): Observable<Array<HesapHareketi>> {
    return this.http.post<Array<HesapHareketi>>(`${this.baseUrl}${this.path}/withInnerModel`, params);
  }

  transfer(dto: any) {
    return this.http.post<any>(`${this.baseUrl}${this.path}/transfer`, dto);
  }
  upload(file: { data: File, fileName: string }, bankName: string): Observable<any> {
    const content_ = new FormData();
    if (file !== null && file !== undefined)
      content_.append("file", file.data, file.fileName ? file.fileName : "file");
    content_.append("bankName", bankName);
    return this.http.post<any>(`${this.baseUrl}${this.path}/upload`, content_).pipe(map(d => {
      return d;
    }));
  }
  aktar(topluYukleSonucu: any): Observable<Array<HesapHareketi>> {
    return this.http.post<Array<HesapHareketi>>(`${this.baseUrl}${this.path}/aktar`, topluYukleSonucu);
  }
  getIslenmemisTahsilatlar(params) {
    return this.http.get<Array<HesapHareketi>>(`${this.baseUrl}${this.path}/islenmemis-tahsilatlar`, params);
  }
  getIslenmemisOdemeler(params) {
    return this.http.get<Array<HesapHareketi>>(`${this.baseUrl}${this.path}/islenmemis-odemeler`, params);
  }
}
