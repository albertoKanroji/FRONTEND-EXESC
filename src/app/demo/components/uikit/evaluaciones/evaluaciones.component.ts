import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';
import * as FileSaver from 'file-saver';
@Component({
    selector: 'app-evaluaciones',

    templateUrl: './evaluaciones.component.html',
    styleUrl: './evaluaciones.component.scss',
    providers: [MessageService],
})
export class EvaluacionesComponent implements OnInit {
    studentForm: FormGroup;
    periodos: any[] = [];
    maestros: any[] = [];
    grupos: any[] = [];
    loading: boolean = false;
    ngOnInit(): void {
        this.loadDocentes();
        this.loadPeriodos();
        this.studentForm = this.fb.group({
            period_id: [null],
            teacher_id: [null],
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
        this.loading = true;
        this.periodosService.getPeriodos().subscribe({
            next: (response) => {
                this.loading = false;
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
                    this.loading = false;
                    console.error(
                        'La respuesta de periodos no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener periodos', err),
        });
    }

    loadDocentes(): void {
        this.loading = true;
        this.docentesService.getDocentes().subscribe({
            next: (response) => {
                console.log('Docentes response:', response); // Depuración
                const data = response.data; // Accede a la clave `data`
                if (Array.isArray(data)) {
                    this.loading = false;
                    this.maestros = data.map((maestro: any) => ({
                        label: maestro.name,
                        value: {
                            id: maestro.id,
                            name: maestro.name,
                            code: maestro.code,
                        },
                    }));
                } else {
                    this.loading = false;
                    console.error(
                        'La respuesta de docentes no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener docentes', err),
        });
    }
    obtenerInforme(id: number) {
        this.loading = true;
        console.log('Buscar informe para el grupo con ID:', id);
        this.envioDatosService.generatePdfEvaluaciones(id).subscribe({
            next: (data: Blob) => {
                const file = new File([data], 'students.pdf', {
                    type: 'application/pdf',
                });
                this.loading = false;
                //FileSaver.saveAs(file, 'students.pdf'); // Trigger browser "Save As" dialog
            },
            error: (error) => {
                this.loading = false;
                console.error('Error al obtener el informe en PDF:', error);
                // Handle errors appropriately, e.g., display an error message to the user
            },
        });
    }

    buscar() {
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
