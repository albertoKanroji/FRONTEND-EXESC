import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EvaluacionesService {
    constructor(private http: HttpClient) {}

    enviarSeleccion(periodId: number, teacherId: number): Observable<any> {
        const payload = {
            period_id: periodId,
            teacher_id: teacherId,
        };
        return this.http.post<any>(
            `${environment.apiUrl}/groups/send-selection`,
            payload
        );
    }

    generatePdfEvaluaciones(groupId: number): Observable<Blob> {
        return this.http.get(
            `${environment.apiUrl}/groups/generate-pdf/${groupId}`,
            { responseType: 'blob' }
        );
    }
    generatePdfInformes(periodId: number): Observable<Blob> {
        return this.http.get(`${environment.apiUrl}/groups/pdf/${periodId}`, {
            responseType: 'blob',
        });
    }
    generatePdfBoletas(studentId: number): Observable<Blob> {
        return this.http.get(
            `${environment.apiUrl}/groups/boleta/${studentId}`,
            {
                responseType: 'blob',
            }
        );
    }
}
