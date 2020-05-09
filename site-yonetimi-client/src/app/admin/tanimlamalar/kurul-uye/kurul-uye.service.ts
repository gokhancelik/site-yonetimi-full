import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class KurulUyeService extends BaseCrudService {
  
  constructor(http: HttpClient) {
    super(http, 'kurul-uye');
  }
}
