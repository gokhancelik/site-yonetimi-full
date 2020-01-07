import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlokService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'blok');
  }
  assignAidatGrubu(id, data: { aidatGrubuId: string, baslangicTarihi: Date }) {
    this.http.post<any>(`${this.baseUrl}${this.path}/${id}/assignAidatGrubu`, data)
  }
}
