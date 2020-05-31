import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { HesapHareketi } from '../../islemler/hesap-hareketi/hesap-hareketi.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HesapTanimiService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'hesap-tanimi');
  }
  getHesapHareketleri(id: string): Observable<Array<HesapHareketi>> {
    return this.http.get<Array<HesapHareketi>>(`${this.baseUrl}${this.path}/${id}/hesap-hareketleri`);
  }
}
