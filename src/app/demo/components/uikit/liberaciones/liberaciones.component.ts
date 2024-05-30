import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
    selector: 'app-liberaciones',

    templateUrl: './liberaciones.component.html',
    styleUrl: './liberaciones.component.scss',
    providers: [MessageService],
})
export class LiberacionesComponent {
    studentForm: FormGroup;
    periodos: any[] = [];
    maestros: any[] = [];
    grupos: any[] = [];
    alumnos: any[] = [];
    loading: boolean = false;
    ngOnInit(): void {
        this.loadPeriodos();
        this.studentForm = this.fb.group({
            period_id: [null],
        });
    }
    constructor(
        private alumnosService: AlumnosService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private countryService: CountryService,
        private periodosService: PeriodosService,
        private docentesService: DocentesService,
        private envioDatosService: EvaluacionesService
    ) {}
    loadPeriodos(): void {
        this.periodosService.getPeriodos().subscribe({
            next: (response) => {
                console.log('Periodos response:', response); // Depuración
                const data = response.data; // Accede a la clave `data`
                if (Array.isArray(data)) {
                    this.periodos = data.map((periodo: any) => ({
                        label: periodo.period,
                        value: {
                            id: periodo.id,
                            name: periodo.period,
                            code: periodo.periodscol,
                        },
                    }));
                } else {
                    console.error(
                        'La respuesta de periodos no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener periodos', err),
        });
    }

    loadALumnos(): void {
        const grupoId = this.studentForm.get('period_id')!.value?.id;
        console.log(grupoId);
        if (grupoId) {
            this.loading = true;
            this.periodosService.getStudentsByPeriod(grupoId).subscribe({
                next: (response) => {
                    console.log('Datos recibidos correctamente', response.data);
                    this.alumnos = response.data || [];
                    this.loading = false;
                    if (this.alumnos.length === 0) {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Información',
                            detail: 'No se encontraron alumnos.',
                        });
                    } else {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Datos recibidos correctamente.',
                        });
                    }
                },
                error: (err) => {
                    console.error('Error al recibir los datos', err);
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al recibir los datos.',
                    });
                },
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Por favor selecciona ambos el periodo y el maestro.',
            });
        }
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: any) {
        table.clear();
    }
}
