import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/v1';
  private router = inject(Router);

  constructor(private http: HttpClient, private cookieService:CookieService) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  getToken(): string | null {
    return this.cookieService.get('access_token')||null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return now >= payload.exp;
    } catch (e) {
      return true;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  logout(): void {
    this.cookieService.delete('access_token');
    this.router.navigate(['/login']);
  }
}
