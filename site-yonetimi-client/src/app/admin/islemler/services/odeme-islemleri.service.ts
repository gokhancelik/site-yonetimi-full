import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TahsilatModel, OdemeYontemi } from '../tahsilat/tahsilat-model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { TahakkukModel } from '../tahakkuk/tahakkuk-model';
import { Tahsilat } from '../../../web-site/online-islemler/models/tahsilat.model';

@Injectable({
  providedIn: 'root'
})
export class OdemeIslemleriService {
  baseUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }
  tahakkukOde(dto: TahsilatOlusturSonucuDto): Observable<TahsilatModel> {
    return this.http.put<TahsilatModel>(`${this.baseUrl}odeme-islemleri/tahakkuk-ode`, dto);
  }
  tahsilatOlustur(dto: TahsilatOlusturDto): Observable<TahsilatOlusturSonucuDto> {
    return this.http.post<TahsilatOlusturSonucuDto>(`${this.baseUrl}odeme-islemleri/tahsilat-olustur`, dto);
  }
}
export class KisiCuzdan {
  tutar: number;
  tahsilatId?: string;
  tahsilat?: TahsilatModel;
  aktifMi: boolean;
}
export class TahsilatOlusturDto {
  tahakkuks?: TahakkukModel[];
  tutar?: number;
  odemeTarihi?: Date;
  odemeYontemi?: OdemeYontemi;
  hesapId?: string;
  cuzdan?: KisiCuzdan;
}
export class TahsilatOlusturSonucuDto {
  tahsilat: Tahsilat;
  cuzdan: KisiCuzdan;
  hesapId: string;
  hesapHareketiId: string;
}