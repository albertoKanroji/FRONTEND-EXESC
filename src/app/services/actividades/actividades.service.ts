import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividades';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

    constructor(private http: HttpClient) { }

    getActividades(): Observable<Actividad[]> {
      return this.http.get<Actividad[]>(`${environment.apiUrl}/activities/`);
    }
}
