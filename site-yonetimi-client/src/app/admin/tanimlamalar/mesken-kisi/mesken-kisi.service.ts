import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { MeskenKisi } from './mesken-kisi.model';
import { Mesken } from '../mesken/mesken.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { KisiCuzdan } from '../../islemler/services/odeme-islemleri.service';
import { TahakkukModel } from '../../islemler/tahakkuk/tahakkuk-model';

@Injectable({
  providedIn: 'root'
})
export class MeskenKisiService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'mesken-kisi');
  }
  getByKisiId(kisiId: string) {
    return this.http.get<Mesken[]>(`${this.baseUrl}${this.path}/${kisiId}/kisiMeskens`);
  }
  getAllWithKisi() {
    return this.http.get<MeskenKisi[]>(`${this.baseUrl}${this.path}/withKisi`).pipe(map(d => {
      return d;
    }));
  }
  getCuzdan(id: string): Observable<KisiCuzdan> {
    return this.http.get<KisiCuzdan>(`${this.baseUrl}${this.path}/${id}/cuzdan`);
  }
  getCurrentUserCuzdan(): Observable<KisiCuzdan[]> {
    return this.http.get<KisiCuzdan[]>(`${this.baseUrl}${this.path}/currentUserCuzdan`);
  }
  getOdenmemisTahakkuklar(id: string): Observable<TahakkukModel[]> {
    return this.http.get<TahakkukModel[]>(`${this.baseUrl}${this.path}/${id}/odenmemis-aidatlar`);
  }
}