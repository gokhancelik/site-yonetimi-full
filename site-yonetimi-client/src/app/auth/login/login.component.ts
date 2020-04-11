import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' }
  error: string;
  isBrowser: boolean;
  constructor(private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
  }
  login() {
    this.error = '';
    this.authService.authenticate(this.user)
      .subscribe(d => {
        if (this.isBrowser) {
          localStorage.setItem('token', d.access_token);
        }
        this.router.navigate([this.authService.redirectUrl]);
        this.authService.redirectUrl = '';
      }, (e) => {
        this.error = 'Kullanıcı adı veya şifre hatalı';
      });
  }
}
