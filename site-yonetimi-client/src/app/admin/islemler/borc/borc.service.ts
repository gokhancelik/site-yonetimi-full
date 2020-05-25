import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borc } from './borc.model';

@Injectable({
  providedIn: 'root'
})
export class BorcService extends BaseCrudService {
  constructor(http: HttpClient) {
    super(http, 'borc');
  }
  ode(id: string, hesapHareketi: { tutar?: number; odemeTarihi?: Date; hesapId?: string; }): Observable<Borc> {
    return this.http.put<Borc>(`${this.baseUrl}${this.path}/${id}/ode`, hesapHareketi);
  }
  getBorcByFirmaId(firmaId: string): Observable<Borc[]> {
    return this.http.get<Borc[]>(`${this.baseUrl}${this.path}/${firmaId}/borcs`);
  }
}
