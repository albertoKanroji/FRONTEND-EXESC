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
}
