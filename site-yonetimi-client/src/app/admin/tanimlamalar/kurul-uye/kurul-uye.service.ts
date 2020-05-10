import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../base-crud.service';
import { KurulUye } from './kurul-uye.model';

@Injectable({
  providedIn: 'root'
})
export class KurulUyeService extends BaseCrudService {
  
  constructor(http: HttpClient) {
    super(http, 'kurul-uye');
  }
  getByKisiId(kisiId: string) {
    return this.http.get<KurulUye[]>(`${this.baseUrl}${this.path}/${kisiId}/kisis`);
  }
  
  getByMeskenId(meskenId: string) {
    return this.http.get<KurulUye[]>(`${this.baseUrl}${this.path}/${meskenId}/meskens`);
  }
}
