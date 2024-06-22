import { Component } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import * as FileSaver from 'file-saver';
@Component({
    selector: 'app-horario-student',

    templateUrl: './horario-student.component.html',
    styleUrl: './horario-student.component.scss',
})
export class HorarioStudentComponent {
    groups: any[] = [];
    studentId = 1; // Aquí debes obtener dinámicamente el ID del estudiante
    loading = false;
    constructor(
        private groupService: ActividadesService,
        private envioDatosService: EvaluacionesService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.groupService
            .getGroupsByTeacherd(this.studentId)
            .subscribe((response: any) => {
                if (response.success) {
                    this.groups = response.data;
                    this.loading = false;
                }
                this.loading = false;
            });
    }
    downloadStudentList(groupId: number) {
        this.loading = true;
        console.log('Buscar informe para el grupo con ID:', groupId);
        this.envioDatosService.generatePdfEvaluaciones(groupId).subscribe({
            next: (data: Blob) => {
                const file = new File([data], 'students.pdf', {
                    type: 'application/pdf',
                });
                this.loading = false;
                FileSaver.saveAs(file, 'students.pdf'); // Trigger browser "Save As" dialog
            },
            error: (error) => {
                this.loading = false;
                console.error('Error al obtener el informe en PDF:', error);
                // Handle errors appropriately, e.g., display an error message to the user
            },
        });
    }
}
