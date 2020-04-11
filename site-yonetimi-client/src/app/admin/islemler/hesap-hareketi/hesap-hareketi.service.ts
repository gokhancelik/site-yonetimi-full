import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class HesapHareketleriService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'hesapHareketi');
  }
  getListWithInnerModel<HesapHareketi>(): Observable<Array<HesapHareketi>> {
    return this.http.get<Array<HesapHareketi>>(`${this.baseUrl}${this.path}/withInnerModel`).pipe(map(d => {
        return d;
    }));
}
}
