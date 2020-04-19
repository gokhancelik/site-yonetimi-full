import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesken } from './mesken.model';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.model';

@Injectable({
  providedIn: 'root'
})
export class MeskenService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'mesken');
  }
  assignAidatGrubu(id, data: { aidatGrubuId: string, baslangicTarihi: Date }) {
    return this.http.post<any>(`${this.baseUrl}${this.path}/${id}/assignAidatGrubu`, data);
  }
  getKisis(id: string): Observable<MeskenKisi[]> {
    return this.http.get<MeskenKisi[]>(`${this.baseUrl}${this.path}/${id}/Kisis`);
  }
  findByUstId(id: string): Observable<Mesken[]>{
    return this.http.get<Mesken[]>(`${this.baseUrl}${this.path}/${id}/alts`);
  }
}
