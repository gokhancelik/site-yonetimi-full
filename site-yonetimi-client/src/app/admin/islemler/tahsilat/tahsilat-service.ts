import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { TahsilatKalemModel } from './tahsilat-kalem-model';
import { Observable } from 'rxjs';
import { TahakkukModel } from '../tahakkuk/tahakkuk-model';
import { TahsilatModel } from './tahsilat-model';

@Injectable({
  providedIn: 'root'
})
export class TahsilatService extends BaseCrudService {
  constructor(http: HttpClient) {
    super(http, 'tahsilat');
  }
  getTahsilatKalems(id: string): Observable<TahsilatKalemModel[]> {
    return this.http.get<TahsilatKalemModel[]>(`${this.baseUrl}${this.path}/${id}/tahsilatKalems`);
  }
}
