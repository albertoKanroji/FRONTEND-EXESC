import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividades';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ActividadesService {
    constructor(private http: HttpClient) {}

    getActividades(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/activities/`);
    }
    getTipoActividades(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/types-of-activities/`);
    }
    getTipoGruposById(id: string): Observable<any> {
        const url = `${environment.apiUrl}/types-of-groups/${id}`; // Suponiendo que la API tiene un endpoint para obtener actividades por ID
        return this.http.get<any>(url);
    }
    getTipoGrupos(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/types-of-groups/`);
    }
    crearActividad(actividad: any): Observable<any> {
        return this.http.post<any>(
            `${environment.apiUrl}/activities/`,
            actividad
        );
    }
    editarActividad(id, actividad: any): Observable<any> {
        const url = `${environment.apiUrl}/activities/${id}`;
        return this.http.put<any>(url, actividad);
    }
    getActivityById(id: string): Observable<any> {
        const url = `${environment.apiUrl}/activities/${id}`; // Suponiendo que la API tiene un endpoint para obtener actividades por ID
        return this.http.get<any>(url);
    }
    getGroupsByStudentId(studentId: string): Observable<any> {
        return this.http.get(
            `${environment.apiUrl}/groups/students/${studentId}/groups`
        );
    }
    getGroupsByTeacherd(studentId: number): Observable<any> {
        return this.http.get(
            `${environment.apiUrl}/groups/teachers/${studentId}/groups`
        );
    }
}
