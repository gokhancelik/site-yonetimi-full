import { Injectable } from '@angular/core';
import { Tahakkuk } from './models/tahakkuk.model';

@Injectable({
  providedIn: 'root'
})
export class OdemeService {
  seciliTahakkuklar: Tahakkuk[];
  constructor() { }
}
