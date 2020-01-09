import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' }
  error: string;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.error = '';
    this.authService.authenticate(this.user)
      .subscribe(d => {
        localStorage.setItem('token', d.access_token);
        this.router.navigate([this.authService.redirectUrl]);
        this.authService.redirectUrl = '';
      }, (e) => {
        this.error = 'Kullanıcı adı veya şifre hatalı';
      });
  }
}