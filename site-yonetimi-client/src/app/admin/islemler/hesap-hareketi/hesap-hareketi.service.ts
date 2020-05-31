import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../base-crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class HesapHareketleriService extends BaseCrudService {


  constructor(http: HttpClient) {
    super(http, 'hesapHareketi');
  }
  getListWithInnerModel<HesapHareketi>(params): Observable<[Array<HesapHareketi>, number]> {
    const searchParams = new URLSearchParams(params);
    // if (params) {
    //   Object.keys(params).forEach(key => searchParams.append(key, params[key]));
    // }
    return this.http.get<[Array<HesapHareketi>, number]>(`${this.baseUrl}${this.path}/withInnerModel?${searchParams}`);
  }

  transfer(dto: any) {
    return this.http.post<any>(`${this.baseUrl}${this.path}/transfer`, dto);
  }
  upload(file: { data: File, fileName: string }): Observable<any> {
    const content_ = new FormData();
    if (file !== null && file !== undefined)
      content_.append("file", file.data, file.fileName ? file.fileName : "file");
    return this.http.post<any>(`${this.baseUrl}${this.path}/upload`, content_).pipe(map(d => {
      return d;
    }));
  }
}
