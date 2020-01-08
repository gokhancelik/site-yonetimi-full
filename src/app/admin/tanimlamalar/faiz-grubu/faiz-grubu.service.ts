import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class FaizGrubuService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'faiz-grubu');
  }
}
