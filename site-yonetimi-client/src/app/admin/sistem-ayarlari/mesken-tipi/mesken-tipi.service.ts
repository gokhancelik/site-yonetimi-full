import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { MeskenTipiModel } from './mesken-tipi.model';
import { Observable } from 'rxjs';
import { Mesken } from '../../tanimlamalar/mesken/mesken.model';

@Injectable({
  providedIn: 'root'
})
export class MeskenTipiService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'mesken-tipi');
  }
  getByKod(kod: string): Observable<MeskenTipiModel> {
    return this.http.get<MeskenTipiModel>(`${this.baseUrl}${this.path}/findByKod/${kod}`);
  }
  getMeskensByKod(kod: string): Observable<Mesken[]> {
    return this.http.get<Mesken[]>(`${this.baseUrl}${this.path}/${kod}/meskens`);
  }
}
