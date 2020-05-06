import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tahakkuk } from './models/tahakkuk.model';
import { Tahsilat } from './models/tahsilat.model';

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
  getTahsilatlar(): Observable<Tahsilat[]> {
    return this.http.get<Tahsilat[]>(`${this.baseUrl}/tahsilatlar`);
  }
  tahsilatOlustur(tahakkukList: Tahakkuk[]): Observable<Tahsilat> {
    return this.http.post<Tahsilat>(`${this.baseUrl}/tahsilat-olustur`, tahakkukList);
    // .pipe(map(tList => {
    //   return tList.map(t => new Tahsilat().deserialize(t));
    // }));
  }
  odeme(tahsilat: any): Observable<{ htmlResponse: string }> {
    return this.http.post<{ htmlResponse: string }>(`${this.baseUrl}/odeme`, tahsilat);
    // .pipe(map(tList => {
    //   return tList.map(t => new Tahsilat().deserialize(t));
    // }));
  }
}
