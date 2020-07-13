import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { TahakkukModel } from './tahakkuk-model';
import { Borc } from '../borc/borc.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TahakkukService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'tahakkuk');
  }

  tahakkuklariOlustur(id: string, borc: { tutar?: number, vadeTarihi?: Date, faizGrubuId?: string }): Observable<TahakkukModel[]> {
    return this.http.post<TahakkukModel[]>(`${this.baseUrl}${this.path}/${id}/tahakkukOlustur`, borc);
  }
  getQuery(query): Observable<[Array<TahakkukModel>, number]> {
    return this.http.post<[Array<TahakkukModel>, number]>(`${this.baseUrl}${this.path}/query`, query);
  }
}
