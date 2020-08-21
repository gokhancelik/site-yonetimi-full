import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import * as jwt_decode from 'jwt-decode';

export interface Token {
  username: string,
  sub: string,
  ad: string,
  oyad: string,
  tamAd: string,
  roles: [
  ],
  iat: number,
  exp: number
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: any = '';
  isBrowser: boolean;
  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  authenticate(model: any) {
    return this.http.post<any>(`${environment.apiUrl}auth/login`, model)
  }
  sendPassword(value: any) {
    return this.http.post<any>(`${environment.apiUrl}auth/send-password`, value)
  }
  getToken(): string {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return '';
  }

  getUser(): Token {
    if (this.isBrowser) {
      let token = this.getToken();
      if (token) {
        let user = <Token>jwt_decode(token);
        if (user.exp * 1000 < new Date().getTime()) {
          this.logout();
          return null;
        }
        return user;
      }
    }
    return null;
  }
  decodeToken(base64IdToken) {
    return decodeURIComponent(atob(base64IdToken).replace(/(.)/g, function (m, p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = '0' + code;
      }
      return '%' + code;
    })); // jshint ignore:line
  }
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }
  isAuthenticated() {
    let token = this.getUser();
    return token && token.exp > (Date.now() / 1000);
  }
}
