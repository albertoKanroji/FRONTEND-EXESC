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
    userProfile:any;
    activityResponse:any;
    constructor(
        private groupService: EncuestasService,
        private toastr: ToastrService,
        private router: Router,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.userProfile = localStorage.getItem('profile');
        console.log('User Profile:',this. userProfile);

        if (this.userProfile === 'Profesor') {
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
        if (this.userProfile === 'Estudiante') {
            this.groupService.getActividades().subscribe({
                next: (response: any) => {
                    if (response.success) {
                        this.showSuccess();
                        this.encuestas = response.data;
                        this.CheckEncuesta();
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
    CheckEncuesta() {
        this.groupService.CheckEncuestasEstudiante().subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccess();

                } else {
                    this.encuestas.forEach((encuesta: any) => {
                        this.activityResponse = response.find((activity: any) => activity.activity_name === encuesta.description);
                        encuesta.survey_completed = this.activityResponse;
                     //   console.log(this.activityResponse.survey_completed);
                        console.log(encuesta.survey_completed.survey_completed);
                    });
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
