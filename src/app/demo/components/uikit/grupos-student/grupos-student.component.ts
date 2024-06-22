import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actividad } from 'src/app/interfaces/actividades';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';

@Component({
    selector: 'app-grupos-student',

    templateUrl: './grupos-student.component.html',
    styleUrl: './grupos-student.component.scss',
})
export class GruposStudentComponent {
    actividades: Actividad[] = [];
    loading: boolean = true;
    constructor(
        private actividadesService: ActividadesService,
        private toastr: ToastrService
    ) {}
    ngOnInit(): void {
        this.loading = true;
        this.actividadesService.getActividades().subscribe({
            next: (data: any) => {
                if (data.success) {
                    this.showSuccess();
                    this.actividades = data.data;
                    console.log('Actividades:', this.actividades);
                }
            },
            error: (error) => {
                this.showError();
                console.error('Error al obtener las actividades:', error);
            },
            complete: () => {
                this.loading = false;
            },
        });
    }

    showSuccess() {
        this.toastr.info('Completado', 'Datos Cargados');
    }
    showSuccessUpdate() {
        this.toastr.success('Completado', 'Datos Cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un Error');
    }
}
