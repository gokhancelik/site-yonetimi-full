import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sifremi-unuttum',
  templateUrl: './sifremi-unuttum.component.html',
  styleUrls: ['./sifremi-unuttum.component.scss']
})
export class SifremiUnuttumComponent implements OnInit {
  form: FormGroup = new FormGroup({
    telno: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}$/)]),
  });
  sonuc: { success: boolean, message: string };
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  talepEt() {
    this.authService.sendPassword(this.form.value)
      .subscribe(d => {
        this.sonuc = d;
      })
  }
}
