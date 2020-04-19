import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { MeskenKisi } from './mesken-kisi.model';
import { Mesken } from '../mesken/mesken.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeskenKisiService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'mesken-kisi');
  }
  getByKisiId(kisiId: string) {
    return this.http.get<Mesken[]>(`${this.baseUrl}${this.path}/${kisiId}/kisiMeskens`);
  }
  getAllWithKisi() {
    return this.http.get<MeskenKisi[]>(`${this.baseUrl}${this.path}/withKisi`).pipe(map(d => {
      return d;
    }));
  }
}