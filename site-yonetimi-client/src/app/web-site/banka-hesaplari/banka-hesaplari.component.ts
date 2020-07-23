import { Component, OnInit } from '@angular/core';
import { HesapTanimiService } from '../../admin/tanimlamalar/hesap-tanimi/hesap-tanimi.service';
import { Observable } from 'rxjs';
import { HesapTanimi } from '../../admin/tanimlamalar/hesap-tanimi/hesap-tanimi.model';

@Component({
  selector: 'app-banka-hesaplari',
  templateUrl: './banka-hesaplari.component.html',
  styleUrls: ['./banka-hesaplari.component.scss']
})
export class BankaHesaplariComponent implements OnInit {
  hesaplar$: Observable<HesapTanimi[]>;

  constructor(private hesaplarService: HesapTanimiService) { }

  ngOnInit(): void {
    this.hesaplar$ = this.hesaplarService.getList();
  }

}
