import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { TahakkukModel } from './tahakkuk-model';

@Injectable({
  providedIn: 'root'
})
export class TahakkukService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'tahakkuk');
  }
  ode(selectedTahakkuks: string[], hesapHareketi: { tutar?: number; odemeTarihi?: Date; hesapId?: string; }) {
    return this.http.put<TahakkukModel[]>(`${this.baseUrl}${this.path}/ode`, { selectedTahakkuks, hesapHareketi });
  }
}
