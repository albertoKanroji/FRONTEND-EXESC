import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private token: string | null = null;

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password });
    }

    setToken(token: string): void {
      this.token = token;
      localStorage.setItem('token', token);
    }

    getToken(): string | null {
      if (!this.token) {
        this.token = localStorage.getItem('token');
      }
      return this.token;
    }

    logout(): void {
      this.token = null;
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    }

    isAuthenticated(): boolean {
      const token = this.getToken();
      return !!token;
    }
}
