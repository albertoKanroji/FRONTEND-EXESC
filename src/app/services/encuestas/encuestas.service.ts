import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividades';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EncuestasService {
    constructor(private http: HttpClient) {}
    getActividades(): Observable<any> {
        const id= localStorage.getItem('id');
        return this.http.get<any>(`${environment.apiUrl}/surveys/students/${id}/create-surveys`);
    }
    CheckEncuestasEstudiante(): Observable<any> {
        const student_id = localStorage.getItem('id');
        return this.http.post<any>(`${environment.apiUrl}/students/check-surveys`, { student_id });
    }


    getActividadesDocente(): Observable<any> {
        const id= localStorage.getItem('id');
        return this.http.get<any>(`${environment.apiUrl}/surveys/teacher/${id}/create-surveys`);
    }
    getActividadesDocenteAlumnos(id:number): Observable<any> {
        //const id= localStorage.getItem('id');
        return this.http.get<any>(`${environment.apiUrl}/surveys/teacher/${id}/students`);
    }
    getEncuestaID(id: string): Observable<any> {
        const url = `${environment.apiUrl}/surveys/${id}`; // Suponiendo que la API tiene un endpoint para obtener actividades por ID
        return this.http.get<any>(url);
    }

    getDocenteQuestions(): Observable<any> {
        const url = `${environment.apiUrl}/questions/docente`; // Suponiendo que la API tiene un endpoint para obtener actividades por ID
        return this.http.get<any>(url);
    }
    getAlumnoQuestions(): Observable<any> {
        const url = `${environment.apiUrl}/questions/alumno`; // Suponiendo que la API tiene un endpoint para obtener actividades por ID
        return this.http.get<any>(url);
    }
    saveResponses(data: any): Observable<any> {
        const url = `${environment.apiUrl}/survey-responses/store`;  // Reemplaza con la ruta correcta de tu API
        return this.http.post<any>(url, data, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
      }
}
