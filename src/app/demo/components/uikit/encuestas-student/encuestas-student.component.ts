import { Component } from '@angular/core';
import { EncuestasService } from 'src/app/services/encuestas/encuestas.service';

@Component({
    selector: 'app-encuestas-student',

    templateUrl: './encuestas-student.component.html',
    styleUrl: './encuestas-student.component.scss',
})
export class EncuestasStudentComponent {
    encuestas: any[] = [];
    loading = false;
    constructor(private groupService: EncuestasService) {}

    ngOnInit(): void {
        this.loading = true;
        this.groupService.getActividades().subscribe((response: any) => {
            if (response.success) {
                this.loading = false;
                this.encuestas = response.data;
            }
            this.loading = false;
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
}
