import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
    selector: 'app-boletas',

    templateUrl: './boletas.component.html',
    styleUrl: './boletas.component.scss',
    providers: [MessageService],
})
export class BoletasComponent {
    loadOpcion() {
        this.opciones = [
            { label: 'Carrera', value: 'career' },
            { label: 'Actividad', value: 'activity' },
        ];
    }

    studentForm: FormGroup;
    periodos: any[] = [];
    opciones: any[] = [];
    maestros: any[] = [];
    grupos: any[] = [];
    carreras: any[] = [];
    alumnos: any[] = [];
    loading: boolean = false;
    ngOnInit(): void {
        this.loadPeriodos();
        this.studentForm = this.fb.group({
            opcion: [''],
            periodoId: [''],
            filterId: [''],
        });
    }
    constructor(
        private alumnosService: AlumnosService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private countryService: CountryService,
        private periodosService: PeriodosService,
        private docentesService: DocentesService,
        private envioDatosService: EvaluacionesService,
        private gruposService: GruposService
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
    loadFiltro() {
        const opcion = this.studentForm.get('filterId')!.value;

        if (opcion === 'career') {
            console.log(opcion);
            this.loadCarreras();
            // Lógica para cargar las carreras
        } else if (opcion === 'activity') {
            console.log(opcion);
            this.loadGrupos();
        }
    }
    loadGrupos() {
        this.gruposService.getGroups().subscribe({
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
    loadCarreras() {
        this.gruposService.getCarreras().subscribe({
            next: (response) => {
                console.log('Carreras response:', response);
                const data = response.data;
                if (Array.isArray(data)) {
                    this.grupos = data.map((grupo: any) => ({
                        label: grupo.name, // Asegúrate de tener el campo correcto para el nombre del grupo
                        value: { id: grupo.id, name: grupo.name },
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

    loadALumnos(): void {
        const periodId = this.studentForm.get('periodoId')!.value?.id;
        const filterId = this.studentForm.get('filterId')!.value;
        const opcion = this.studentForm.get('opcion')!.value?.id;
        console.log(periodId);
        console.log(filterId);
        console.log(opcion);

        if (!opcion) {
            this.grupos = [];
            return;
        }

        this.periodosService
            .getStudentsByPeriodFiltered(periodId, filterId, opcion)
            .subscribe({
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
