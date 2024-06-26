import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AlumnosService {
    constructor(private http: HttpClient) {}

    // Login
    login(email: string, password: string): Observable<any> {
        const url = `${environment.apiUrl}/login`;
        return this.http
            .post(url, { email, password })
            .pipe(catchError(this.handleError));
    }

    // Obtener todos los estudiantes
    getAllStudents(): Observable<any> {
        return this.http
            .get(`${environment.apiUrl}/students`)
            .pipe(catchError(this.handleError));
    }

    // Crear un nuevo estudiante
    createStudent(studentData: any): Observable<any> {
        return this.http
            .post(`${environment.apiUrl}/students`, studentData)
            .pipe(catchError(this.handleError));
    }

    // Obtener un estudiante por ID
    getStudentById(id: number): Observable<any> {
        const url = `${environment.apiUrl}/students/${id}`;
        return this.http.get(url).pipe(catchError(this.handleError));
    }

    getStudentByControlNumber(control_number: string): Observable<any> {
        const url = `${environment.apiUrl}/students/searchByControlNumber`;
        const body = { control_number };
        return this.http.post(url, body).pipe(catchError(this.handleError));
    }

    // Actualizar un estudiante por ID
    updateStudent(id: number, studentData: any): Observable<any> {
        const url = `${environment.apiUrl}/students/${id}`;
        return this.http
            .put(url, studentData)
            .pipe(catchError(this.handleError));
    }

    // Eliminar un estudiante por ID
    deleteStudent(id: number): Observable<any> {
        const url = `${environment.apiUrl}/students/${id}`;
        return this.http.delete(url).pipe(catchError(this.handleError));
    }

    // Manejo de errores
    private handleError(error: any): Observable<never> {
        console.error('An error occurred', error);
        throw error;
    }
}
