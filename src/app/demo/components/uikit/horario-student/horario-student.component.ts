import { Component } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';

@Component({
    selector: 'app-horario-student',

    templateUrl: './horario-student.component.html',
    styleUrl: './horario-student.component.scss',
})
export class HorarioStudentComponent {
    groups: any[] = [];
    studentId = 1; // Aquí debes obtener dinámicamente el ID del estudiante
    loading = false;
    constructor(private groupService: ActividadesService) {}

    ngOnInit(): void {
        this.loading = true;
        this.groupService
            .getGroupsByStudentId(this.studentId)
            .subscribe((response: any) => {
                if (response.success) {
                    this.groups = response.data;
                    this.loading = false;
                }
                this.loading = false;
            });
    }
}
