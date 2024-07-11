/**
 * Auth Interceptor
 * 
 * Implements the HttpInterceptor interface to add an Authorization header
 * to each HTTP request if a token is present in the local storage. This is typically used
 * to authenticate requests to the backend API.
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // next: The next interceptor in the chain, or the backend if no other interceptors remain.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Pass the modified request to the next handler in the chain
    return next.handle(request);
  }
}
