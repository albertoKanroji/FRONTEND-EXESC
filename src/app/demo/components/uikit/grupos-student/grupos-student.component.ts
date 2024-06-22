import { Component } from '@angular/core';
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
    constructor(private actividadesService: ActividadesService) {}
    ngOnInit(): void {
        this.actividadesService.getActividades().subscribe(
            (data: any) => {
                if (data.success) {
                    this.actividades = data.data;
                    console.log('Actividades:', this.actividades);
                }
                this.loading = false;
            },
            (error) => {
                console.error('Error al obtener las actividades:', error);
                this.loading = false;
            }
        );
    }
}
