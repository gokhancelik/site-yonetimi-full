import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TahsilatKalemModel } from './tahsilat-kalem-model';

@Injectable({
  providedIn: 'root'
})
export class TahsilatKalemService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'tahsilat-kalem');
  }

  getByTahsilatId(id: string): Observable<TahsilatKalemModel[]> {
    return this.http.get<TahsilatKalemModel[]>(`${this.baseUrl}${this.path}/${id}/tahsilatKalems`);
  }
}
