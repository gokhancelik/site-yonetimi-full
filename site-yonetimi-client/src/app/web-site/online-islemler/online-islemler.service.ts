import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tahakkuk } from './models/tahakkuk.model';
import { Tahsilat } from './models/tahsilat.model';
import { TahsilatSanalPosLog } from './models/tahsilat-sanal-pos-log.model';
import { TahsilatOlusturSonucuDto } from '../../admin/islemler/services/odeme-islemleri.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineIslemlerService {
  

  baseUrl: string;


  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}online-islemler`
  }
  getOdenmemisAidatlar(): Observable<Tahakkuk[]> {
    return this.http.get<Tahakkuk[]>(`${this.baseUrl}/odenmemis-aidatlar`);
  }
  getOdenmisAidatlar(): Observable<Tahakkuk[]> {
    return this.http.get<Tahakkuk[]>(`${this.baseUrl}/odenmis-aidatlar`);
  }
  getSanalPosLog(id): Observable<TahsilatSanalPosLog> {
    return this.http.get<TahsilatSanalPosLog>(`${this.baseUrl}/${id}/sanal-pos-log`);
  }
  getSonSanalPosLog(durum) {
    return this.http.get<TahsilatSanalPosLog>(`${this.baseUrl}/son-sanal-pos-log/${durum}`);
  }
  getTahsilatlar(): Observable<Tahsilat[]> {
    return this.http.get<Tahsilat[]>(`${this.baseUrl}/tahsilatlar`);
  }
  tahsilatOlustur(tahakkukList: Tahakkuk[]): Observable<Tahsilat> {
    return this.http.post<Tahsilat>(`${this.baseUrl}/tahsilat-olustur`, tahakkukList);
  }
  odeme(tahsilat: any): Observable<{ htmlResponse: string }> {
    return this.http.post<{ htmlResponse: string }>(`${this.baseUrl}/odeme`, tahsilat);
  }
}
