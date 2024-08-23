import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EncuestasService } from 'src/app/services/encuestas/encuestas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/login/admin/auth.service';

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
        private toastr: ToastrService,
        private router: Router,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        const userProfile = localStorage.getItem('profile');
        console.log('User Profile:', userProfile);

        if (userProfile === 'Profesor') {
            this.groupService.getActividadesDocente().subscribe({
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
        if (userProfile === 'Estudiante') {
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
    }

    responderEncuesta(encuestaId: number): void {
        console.log(`Responder encuesta ${encuestaId}`);
        this.router.navigate([`modules/alumno/encuesta`, encuestaId]);
    }
    responderEncuestaDocente(encuestaId: number): void {
        console.log(`Responder encuesta ${encuestaId}`);
        this.router.navigate([`modules/profesor/encuesta`, encuestaId]);
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
