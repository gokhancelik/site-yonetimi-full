import { Injectable } from '@angular/core';
import { BaseCrudService } from '../base-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http, 'site')
  }
}
