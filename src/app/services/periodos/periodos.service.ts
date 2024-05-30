import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PeriodosService {
    constructor(private http: HttpClient) {}

    getPeriodos(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/periods/`);
    }
    get(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/periods/`);
    }
    getStudentsByGroupId(groupId: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiUrl}/groups/students-group/${groupId}`
        );
    }
    getStudentsByPeriod(periodId: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiUrl}/groups/students-period/${periodId}`
        );
    }
    getStudentsByPeriodAndGroup(
        periodId: string,
        groupId: string
    ): Observable<any> {
        return this.http.post<any>(
            `${environment.apiUrl}/groups/students-period`,
            { periodId, groupId }
        );
    }
    getStudentsByPeriodFiltered(
        periodId: string,
        filterBy: string,
        filterId: string
    ): Observable<any> {
        return this.http.post<any>(
            `${environment.apiUrl}/groups/students-by-filter`,
            { periodId, filterBy, filterId }
        );
    }
}
