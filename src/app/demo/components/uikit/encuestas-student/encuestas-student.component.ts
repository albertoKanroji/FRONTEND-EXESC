import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EncuestasService } from 'src/app/services/encuestas/encuestas.service';

@Component({
    selector: 'app-encuestas-student',

    templateUrl: './encuestas-student.component.html',
    styleUrl: './encuestas-student.component.scss',
})
export class EncuestasStudentComponent {
    encuestas: any[] = [];
    loading = false;
    constructor(
        private groupService: EncuestasService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.groupService.getActividades().subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccess();
                    this.encuestas = response.data;
                } else {
                    this.showError();
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error fetching activities:', error);
                this.showError();
            },
            complete: () => {
                this.loading = false;
            },
        });
    }

    responderEncuesta(encuestaId: number): void {
        // Lógica para responder encuesta
        console.log(`Responder encuesta ${encuestaId}`);
    }

    recordarmeEnUnDia(encuestaId: number): void {
        // Lógica para recordar en un día
        console.log(`Recordar encuesta ${encuestaId} en un día`);
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
