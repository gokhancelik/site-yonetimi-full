import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KisiService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'kisi');
  }
  getBagimsizBolums(id: string): Observable<BagimsizBolumKisi[]> {
    return this.http.get<BagimsizBolumKisi[]>(`${this.baseUrl}${this.path}/${id}/BagimsizBolums`);
  }
}
