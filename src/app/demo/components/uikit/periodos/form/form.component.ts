import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-form',

    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    providers: [MessageService],
})
export class FormComponent {
    actividadForm: FormGroup;
    isEdit: boolean = false;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private actividadesService: ActividadesService,
        private gruposService: GruposService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private toastr: ToastrService,
        private periodosService: PeriodosService,
        private docentesService: DocentesService
    ) {
        this.actividadForm = this.fb.group({
            start_period: ['', [Validators.required]],
            end_period: ['', [Validators.required, Validators.maxLength(255)]],
            registration_start: [null, [Validators.required]],
            registration_end: [null, [Validators.required]],
            selectiv_start: [null, [Validators.required]],
            selectiv_end: [null, [Validators.required]],
            period: ['Agosto'], // Valor por defecto "2024"
            status: [1, [Validators.required]],
        });
    }

    onSubmit() {
        if (this.actividadForm.invalid) {
            this.toastr.error('Por favor, complete todos los campos requeridos.', 'Error');
            return;
        }

        this.loading = true;
        const formValue = this.actividadForm.value;
        const payload = {
            start_period: this.formatDateForBackend(formValue.start_period),
            end_period: this.formatDateForBackend(formValue.end_period),
            registration_start: this.formatDateForBackend(formValue.registration_start),
            registration_end: this.formatDateForBackend(formValue.registration_end),
            selectiv_start: this.formatDateForBackend(formValue.selectiv_start),
            selectiv_end: this.formatDateForBackend(formValue.selectiv_end),
            period: formValue.periodscol,
            status: formValue.status
        };
        this.periodosService.createPeriodo(payload).subscribe({
            next: (response) => {
                this.toastr.success('Periodo creado exitosamente.', 'Éxito');
                this.router.navigate(['/periodos']);
            },
            error: (error) => {
                this.toastr.error('Ocurrió un error al crear el periodo.', 'Error');
                console.error(error);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    formatDateForBackend(date: Date): string {
        return formatDate(date, 'yyyy-MM-dd HH:mm:ss', 'en');
    }
}
