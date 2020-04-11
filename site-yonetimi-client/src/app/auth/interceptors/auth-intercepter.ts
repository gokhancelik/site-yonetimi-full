import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.auth.getToken();
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(request);
    }
}
