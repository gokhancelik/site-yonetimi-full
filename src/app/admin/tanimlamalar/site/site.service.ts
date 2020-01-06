import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'site');
  }
}
