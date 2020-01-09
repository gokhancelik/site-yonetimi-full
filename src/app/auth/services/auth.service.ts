import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


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
  constructor(private http: HttpClient) { }
  authenticate(model: any) {
    return this.http.post<any>(`${environment.apiUrl}auth/login`, model)
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  getUser(): Token {
    let token = this.getToken();
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }
  logout() {
    localStorage.removeItem('token');
  }
  isAuthenticated() {
    let token = this.getUser();
    return token && token.exp > (Date.now() / 1000);
  }
}
