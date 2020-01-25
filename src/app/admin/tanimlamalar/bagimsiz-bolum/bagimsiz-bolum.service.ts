import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BagimsizBolumService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'bagimsiz-bolum');
  }
  assignAidatGrubu(id, data: { aidatGrubuId: string, baslangicTarihi: Date }) {
    return this.http.post<any>(`${this.baseUrl}${this.path}/${id}/assignAidatGrubu`, data)
  }
}