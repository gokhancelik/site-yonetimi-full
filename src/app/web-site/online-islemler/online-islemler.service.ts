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
  tahsilatOlustur(tahakkukList: Tahakkuk[]): Observable<Tahsilat> {
    return this.http.post<Tahsilat>(`${this.baseUrl}/tahsilat-olustur`, tahakkukList);
    // .pipe(map(tList => {
    //   return tList.map(t => new Tahsilat().deserialize(t));
    // }));
  }
}
