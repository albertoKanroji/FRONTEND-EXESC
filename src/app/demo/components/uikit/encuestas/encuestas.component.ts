import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
    selector: 'app-encuestas',

    templateUrl: './encuestas.component.html',
    styleUrl: './encuestas.component.scss',
    providers: [MessageService],
})
export class EncuestasComponent {
    studentForm: FormGroup;
    periodos: any[] = [];
    maestros: any[] = [];
    grupos: any[] = [];
    alumnos: any[] = [];

    loading: boolean = false;
    ngOnInit(): void {
        this.loadDocentes();
        this.loadPeriodos();
        this.studentForm = this.fb.group({
            period_id: [null],
            teacher_id: [null],
            group_id: [null],
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
    loadGrupos(): void {
        const periodId = this.studentForm.get('period_id')!.value?.id;
        const teacherId = this.studentForm.get('teacher_id')!.value?.id;
        console.log(teacherId);

        if (!teacherId) {
            this.grupos = [];
            return;
        }

        this.envioDatosService.enviarSeleccion(periodId, teacherId).subscribe({
            next: (response) => {
                console.log('Grupos response:', response);
                const data = response.data;
                if (Array.isArray(data)) {
                    this.grupos = data.map((grupo: any) => ({
                        label: grupo.activity.name, // Asegúrate de tener el campo correcto para el nombre del grupo
                        value: { id: grupo.id, name: grupo.activity.name },
                    }));
                } else {
                    console.error(
                        'La respuesta de grupos no es un arreglo',
                        data
                    );
                    this.grupos = [];
                }
            },
            error: (err) => {
                console.error('Error al obtener grupos', err);
                this.grupos = [];
            },
        });
    }

    loadDocentes(): void {
        // const grupoId = this.studentForm.get('group_id')!.value?.id;
        this.docentesService.getDocentes().subscribe({
            next: (response) => {
                console.log('Docentes response:', response); // Depuración
                const data = response.data; // Accede a la clave `data`
                if (Array.isArray(data)) {
                    this.maestros = data.map((maestro: any) => ({
                        label: maestro.name,
                        value: {
                            id: maestro.id,
                            name: maestro.name,
                            code: maestro.code,
                        },
                    }));
                } else {
                    console.error(
                        'La respuesta de docentes no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener docentes', err),
        });
    }

    loadALumnos(): void {
        const grupoId = this.studentForm.get('group_id')!.value?.id;
        console.log(grupoId);
        if (grupoId) {
            this.loading = true;
            this.periodosService.getStudentsByGroupId(grupoId).subscribe({
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
    buscar(): void {
        const periodId = this.studentForm.get('period_id')!.value?.id;
        const teacherId = this.studentForm.get('teacher_id')!.value?.id;
        if (periodId && teacherId) {
            this.loading = true;
            this.envioDatosService
                .enviarSeleccion(periodId, teacherId)
                .subscribe({
                    next: (response) => {
                        console.log('Datos recibidos correctamente', response);
                        this.grupos = response.data || [];
                        this.loading = false;
                        if (this.grupos.length === 0) {
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Información',
                                detail: 'No se encontraron grupos.',
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
