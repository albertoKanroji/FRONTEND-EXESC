import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividades';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GruposService {
    constructor(private http: HttpClient) {}

    getGroups(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/groups/`);
    }
    getCarreras(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/careers/`);
    }

    crearGrupo(actividadData: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/groups`, actividadData);
    }
    editarGrupo(id, actividad: any): Observable<any> {
        const url = `${environment.apiUrl}/groups/actualizar/${id}`;
        return this.http.put<any>(url, actividad);
    }
    getGroupById(id: string): Observable<any> {
        const url = `${environment.apiUrl}/groups/buscar/${id}`; // Suponiendo que la API tiene un endpoint para obtener actividades por ID
        return this.http.get<any>(url);
    }
}
