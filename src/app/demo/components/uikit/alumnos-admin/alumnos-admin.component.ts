import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
    selector: 'app-alumnos-admin',

    templateUrl: './alumnos-admin.component.html',
    styleUrl: './alumnos-admin.component.scss',
    providers: [MessageService],
})
export class AlumnosAdminComponent {
    AlumnoForm: FormGroup;
    student: any;
    loading: boolean = false;
    studentArray: any[] = [];
    constructor(
        private route: ActivatedRoute,
        private alumnosService: AlumnosService,

        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.AlumnoForm = this.fb.group({
            control_number: ['', [Validators.required]],
        });
    }
    ngOnInit(): void {}

    onSubmit(): void {
        if (this.AlumnoForm.valid) {
            this.loading = true;
            const control_number = this.AlumnoForm.get('control_number')?.value;
            this.alumnosService
                .getStudentByControlNumber(control_number)
                .subscribe({
                    next: (data) => {
                        this.loading = false;
                        this.student = data.data;
                        this.studentArray = [this.student];
                        console.log('Student data:', this.student);
                        this.toastr.success('Student found successfully');
                    },
                    error: (err) => {
                        this.loading = false;
                        console.error('Error fetching student:', err);
                        this.toastr.error('Error fetching student');
                    },
                });
        }
    }
    verBoleta(numeroControl: string) {
        // Aquí puedes implementar la lógica para abrir la boleta del estudiante
        console.log(
            'Ver boleta del estudiante con número de control:',
            numeroControl
        );
        // Por ejemplo, podrías redirigir a una ruta específica o abrir un modal con la boleta
        // Esta función se ejecutará cuando se haga clic en el botón "Ver Boleta"
    }
}
