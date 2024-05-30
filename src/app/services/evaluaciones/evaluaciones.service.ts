import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {

    constructor(private http: HttpClient) { }

  enviarSeleccion(periodId: number, teacherId: number): Observable<any> {
    const payload = {
      period_id: periodId,
      teacher_id: teacherId
    };
    return this.http.post<any>(`${environment.apiUrl}/groups/send-selection`, payload);
  }
}
