import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.model';

@Injectable({
  providedIn: 'root'
})
export class BagimsizBolumKisiService extends BaseCrudService {


  constructor(http: HttpClient) {
    super(http, 'bagimsiz-bolum-kisi');
  }
  getByKisiId(kisiId: string) {
    return this.http.get<any>(`${this.baseUrl}${this.path}/${kisiId}/kisiBagimsizBolums`);
  }

}