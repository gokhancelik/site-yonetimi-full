import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.model';

@Injectable({
  providedIn: 'root'
})
export class KisiService extends BaseCrudService {
  
  constructor(http: HttpClient) {
    super(http, 'kisi');
  }
  getMeskens(id: string): Observable<MeskenKisi[]> {
    return this.http.get<MeskenKisi[]>(`${this.baseUrl}${this.path}/${id}/Meskens`);
  }
}
