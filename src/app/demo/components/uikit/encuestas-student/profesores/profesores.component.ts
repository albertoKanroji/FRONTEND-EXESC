import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncuestasService } from 'src/app/services/encuestas/encuestas.service';
import { AuthService } from 'src/app/services/login/admin/auth.service';

@Component({
  selector: 'app-profesores',


  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.scss'
})
export class ProfesoresComponent {
    estudiantes : any[] = [];
    loading: boolean = true;
    constructor(
        private groupService: EncuestasService,
        private toastr: ToastrService,
        private router: Router,
        private auth:AuthService,
        private route: ActivatedRoute,
    ) {}


    ngOnInit(): void {
        const userProfile = localStorage.getItem('profile');
        console.log('User Profile:', userProfile);
        const id = +this.route.snapshot.paramMap.get('id');
        localStorage.setItem('id_encuesta', id.toString());

            this.groupService.getActividadesDocenteAlumnos(id).subscribe({
                next: (response: any) => {
                    if (response.success) {
                        this.showSuccess();
                        this.estudiantes  = response.data;
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
    showSuccess() {
        this.toastr.info('Completado', 'Datos Cargados');
    }
    showSuccessUpdate() {
        this.toastr.success('Completado', 'Datos Cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un Error');
    }
    evaluarAlumno(encuestaId: number): void {
        console.log(`Responder encuesta ${encuestaId}`);
        this.router.navigate([`modules/profesor/encuesta/alumno`, encuestaId]);
    }
}
