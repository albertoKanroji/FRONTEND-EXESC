import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DocentesService {
    constructor(private http: HttpClient) {}

    getDocentes(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/teachers/`);
    }
    getDocentesId(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/teachers/`);
    }

    getTeacher(id: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/teachers/${id}`);
    }

    createTeacher(data: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/teachers/`, data);
    }

    updateTeacher(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/teachers/${id}`, data);
    }

    getJefes(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/jefes/`);
    }
}
