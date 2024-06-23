import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';

@Component({
    selector: 'app-horario-student',

    templateUrl: './horario-student.component.html',
    styleUrl: './horario-student.component.scss',
})
export class HorarioStudentComponent {
    groups: any[] = [];
    // Aquí debes obtener dinámicamente el ID del estudiante
    studentId = localStorage.getItem('id');
    loading = false;
    constructor(
        private groupService: ActividadesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.groupService.getGroupsByStudentId(this.studentId).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccess();
                    this.groups = response.data;
                } else {
                    this.showError();
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error fetching groups:', error);
                this.showError();
            },
            complete: () => {
                this.loading = false;
            },
        });
    }

    showSuccess() {
        this.toastr.info('Completado', 'Datos Cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un Error');
    }
}
