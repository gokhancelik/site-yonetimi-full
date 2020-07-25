import { Component, OnInit } from '@angular/core';
import { KisiService } from '../../../admin/tanimlamalar/kisi/kisi.service';
import { Kisi } from '../../../admin/tanimlamalar/kisi/kisi.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kimlik-bilgileri',
  templateUrl: './kimlik-bilgileri.component.html',
  styleUrls: ['./kimlik-bilgileri.component.scss']
})
export class KimlikBilgileriComponent implements OnInit {
  kisi: Kisi;
  form: FormGroup = new FormGroup({
    ad: new FormControl('', [Validators.required]),
    soyad: new FormControl('', [Validators.required]),
    telefon: new FormControl(null, [Validators.pattern(/\d{10}$/)]),
    cepTelefon: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}$/)]),
    adres: new FormControl('', [Validators.required]),
    eposta: new FormControl('', [Validators.required, Validators.email]),
    tcKimlikNo: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
  });
  guncellemeBasarili: boolean;
  constructor(private kisiService: KisiService) { }

  ngOnInit(): void {
    this.getData();
  }
  private getData() {
    this.guncellemeBasarili = false;
    this.kisiService.getCurrentUser()
      .subscribe(d => {
        this.kisi = d;
        if (this.kisi.ad) {
          this.form.get('ad').disable()
        }
        if (this.kisi.soyad) {
          this.form.get('soyad').disable()
        }
        if (this.kisi.tcKimlikNo) {
          this.form.get('tcKimlikNo').disable()
        }
        this.form.patchValue(this.kisi);
        this.form.updateValueAndValidity();
      });
  }

  submit() {
    this.kisiService.putCurrentUser(this.form.value)
      .subscribe(d => {
        this.getData();
        this.guncellemeBasarili = true;
      })
  }
}
