import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';


export interface Token {
  username: string,
  sub: string,
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
        return JSON.parse(atob(token.split('.')[1]));
      }
    }
    return null;
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
