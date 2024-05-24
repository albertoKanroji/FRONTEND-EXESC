import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthStudentService {

    private token: string | null = null;
    private profile: string;
    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/students/login`, { email, password });
    }
    setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }
    setUserProfile(profile: string) {
        this.profile = profile;
    }

    getUserProfile(): string {
        return this.profile;
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
