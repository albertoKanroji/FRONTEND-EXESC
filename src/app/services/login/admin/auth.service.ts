import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private profile: string;
    private token: string | null = null;
    private id: number;
    private userProfile: string;
    private isAuthenticatedFlag = false;
    private userModulos: any[];
    constructor(private http: HttpClient, private router: Router) {
        this.loadUserModulosFromStorage();
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, {
            email,
            password,
        });
    }
    loginStudent(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/students/login`, {
            email,
            password,
        });
    }
    loginTeacher(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/teachers/login`, {
            email,
            password,
        });
    }
    setUserProfile(profile: string) {
        this.profile = profile;
        localStorage.setItem('profile', profile);
    }

    getUserProfile(): string {
        return this.profile;
    }

    setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }
    setIdStudent(id: string): void {
        const idAsNumber = parseInt(id, 10);
        this.id = idAsNumber;
        localStorage.setItem('id', idAsNumber.toString());
    }

    getToken(): string | null {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }
    setUserModulos(modulos: any[]) {
        this.userModulos = modulos;
        localStorage.setItem('modulos', JSON.stringify(modulos)); // Guardar módulos en localStorage
    }

    getUserModulos(): any[] {
        if (!this.userModulos) {
            this.userModulos = JSON.parse(localStorage.getItem('modulos'));
        }
        return this.userModulos;
    }

    loadUserModulosFromStorage() {
        const modulos = localStorage.getItem('modulos');
        if (modulos) {
            this.userModulos = JSON.parse(modulos);
        }
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        localStorage.removeItem('modulos');
        this.userProfile = null;
        this.userModulos = null;
        this.router.navigate(['/auth/login']);
    }
}
