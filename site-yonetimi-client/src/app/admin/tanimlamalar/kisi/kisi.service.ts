import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.model';
import { TahakkukModel } from '../../islemler/tahakkuk/tahakkuk-model';
import { TahsilatModel } from '../../islemler/tahsilat/tahsilat-model';
import { Kisi } from './kisi.model';

@Injectable({
  providedIn: 'root'
})
export class KisiService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'kisi');
  }
  getMeskens(id: string): Observable<MeskenKisi[]> {
    return this.http.get<MeskenKisi[]>(`${this.baseUrl}${this.path}/${id}/Meskens`);
  }
  getOdenmemisTahakkuklar(id: string): Observable<TahakkukModel[]> {
    return this.http.get<TahakkukModel[]>(`${this.baseUrl}${this.path}/${id}/odenmemis-aidatlar`);
  }
  getOdenmisTahakkuklar(id: string): Observable<TahakkukModel[]> {
    return this.http.get<TahakkukModel[]>(`${this.baseUrl}${this.path}/${id}/odenmis-aidatlar`);
  }
  getTahsilatlar(id: string): Observable<TahsilatModel[]> {
    return this.http.get<TahsilatModel[]>(`${this.baseUrl}${this.path}/${id}/tahsilatlar`);
  }
  getCurrentUser(): Observable<Kisi> {
    return this.http.get<Kisi>(`${this.baseUrl}${this.path}/current-user`);
  }

}
