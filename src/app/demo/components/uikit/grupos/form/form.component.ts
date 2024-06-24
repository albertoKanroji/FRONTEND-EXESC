import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-form',

    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    providers: [MessageService],
})
export class FormComponent {
    actividadForm: FormGroup;
    id: string | null = null;

    isEdit: boolean = false;
    uploadedFiles: any[] = [];
    base64Image: string | null = null;
    loading = false;
    periodos: any[] = [];
    actividades: any[] = [];
    docentes: any[] = [];
    tipoGrupos: any[] = [];

    daysOfWeek = [
        { label: 'Lunes', value: 'Monday' },
        { label: 'Martes', value: 'Tuesday' },
        { label: 'Miércoles', value: 'Wednesday' },
        { label: 'Jueves', value: 'Thursday' },
        { label: 'Viernes', value: 'Friday' },
        { label: 'Sábado', value: 'Saturday' },
        { label: 'Domingo', value: 'Sunday' },
    ];

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
            quota_limit: [
                '',
                [Validators.required, Validators.pattern(/^\d+$/)],
            ],
            location: ['', [Validators.required, Validators.maxLength(255)]],
            periods_id: [null, [Validators.required]],
            teachers_id: [
                null,
                [Validators.required, Validators.pattern(/^\d+$/)],
            ],
            activities_id: [
                null,
                [Validators.required, Validators.pattern(/^\d+$/)],
            ],
            type_of_groups_id: [
                null,
                [Validators.required, Validators.pattern(/^\d+$/)],
            ],
            schedules: this.fb.array([]), // Inicializamos el FormArray vacío
        });
    }
    // Función para crear un nuevo FormGroup para el subformulario de horarios
    createSchedule(): FormGroup {
        return this.fb.group({
            day: ['', Validators.required],
            start_time: ['', Validators.required],
            end_time: ['', Validators.required],
        });
    }

    // Función para agregar un nuevo horario al FormArray de schedules
    addSchedule(): void {
        this.schedules.push(this.createSchedule());
    }

    // Función para eliminar un horario del FormArray de schedules
    removeSchedule(index: number): void {
        this.schedules.removeAt(index);
    }

    // Getter para acceder al FormArray de schedules
    get schedules(): FormArray {
        return this.actividadForm.get('schedules') as FormArray;
    }

    ngOnInit(): void {
        this.loadTipo();
        this.loadPeriodo();
        this.loadDocente();
        this.loadActividad();
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            this.isEdit = this.id !== null;
            if (this.isEdit) {
                this.loadGrupoID(this.id);

                console.log('Editando actividad con ID:', this.id);
            } else {
                console.log('Creando nueva actividad');
            }
        });
    }
    loadActividad() {
        this.actividadesService.getActividades().subscribe({
            next: (response) => {
                // console.log('tipo de actividades response:', response.data);
                const data = response.data;
                console.log(data);
                if (Array.isArray(data)) {
                    this.actividades = data.map((actividad: any) => ({
                        label: actividad.name,
                        value: { id: actividad.id },
                    }));
                } else {
                    console.error(
                        'La respuesta de actividades no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener actividades', err),
        });
    }
    loadPeriodo() {
        this.periodosService.getPeriodos().subscribe({
            next: (response) => {
                // console.log('tipo de actividades response:', response.data);
                const data = response.data;
                console.log(data);
                if (Array.isArray(data)) {
                    this.periodos = data.map((actividad: any) => ({
                        label: actividad.period,
                        value: { id: actividad.id },
                    }));
                } else {
                    console.error(
                        'La respuesta de actividades no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener actividades', err),
        });
    }
    loadTipo() {
        this.actividadesService.getTipoGrupos().subscribe({
            next: (response) => {
                console.log('tipo de actividades response:', response.data);
                const data = response.data;
                if (Array.isArray(data)) {
                    this.tipoGrupos = data.map((actividad: any) => ({
                        label: actividad.name,
                        value: { id: actividad.id },
                    }));
                } else {
                    console.error(
                        'La respuesta de actividades no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener actividades', err),
        });
    }
    loadDocente() {
        this.docentesService.getDocentes().subscribe({
            next: (response) => {
                // console.log('tipo de actividades response:', response.data);
                const data = response.data;
                console.log(data);
                if (Array.isArray(data)) {
                    this.docentes = data.map((actividad: any) => ({
                        label: actividad.name,
                        value: { id: actividad.id },
                    }));
                } else {
                    console.error(
                        'La respuesta de actividades no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener actividades', err),
        });
    }

    loadGrupoID(id: string): void {
        this.loading = true;
        this.gruposService.getGroupById(id).subscribe({
            next: (response) => {
                this.showSuccess();
                const data = response.data;
                console.log(data);
                console.log(data.periods_id);
                this.actividadForm.patchValue({
                    quota_limit: data.quota_limit,
                    location: data.location,
                    periods_id: {
                        id: data.periods_id,
                    },
                    teachers_id: {
                        id: data.teachers_id,
                    },
                    activities_id: {
                        id: data.activities_id,
                    },
                    type_of_groups_id: {
                        id: data.type_of_groups_id,
                    },
                });

                // Rellenar el FormArray de schedules
                const schedulesFormArray = this.actividadForm.get(
                    'schedules'
                ) as FormArray;
                schedulesFormArray.clear(); // Limpiar cualquier elemento existente en el FormArray
                data.schedules.forEach((schedule: any) => {
                    schedulesFormArray.push(
                        this.fb.group({
                            day: schedule.day,
                            start_time: schedule.start_time,
                            end_time: schedule.end_time,
                        })
                    );
                });
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.showError();
                console.error('Error al obtener la actividad', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al obtener la actividad',
                });
            },
        });
    }

    loadGrupos(): void {
        this.actividadesService.getTipoActividades().subscribe({
            next: (response) => {
                console.log('tipo de actividades response:', response);
                const data = response.data;
                if (Array.isArray(data)) {
                    this.actividades = data.map((actividad: any) => ({
                        label: actividad.name,
                        value: { id: actividad.id },
                    }));
                } else {
                    console.error(
                        'La respuesta de actividades no es un arreglo',
                        data
                    );
                }
            },
            error: (err) => console.error('Error al obtener actividades', err),
        });
    }

    crearGrupo(): void {
        console.log(this.actividadForm.value);
        if (this.actividadForm) {
            const formValue = this.actividadForm.value;
            const actividadData = {
                quota_limit: formValue.quota_limit,
                location: formValue.location,
                periods_id: formValue.periods_id.id,
                teachers_id: formValue.teachers_id.id,
                activities_id: formValue.activities_id.id,
                type_of_groups_id: formValue.type_of_groups_id.id,
                schedules: formValue.schedules.map((schedule: any) => ({
                    day: schedule.day,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time,
                })),
            };
            console.log(actividadData);

            this.gruposService.crearGrupo(actividadData).subscribe({
                next: (response) => {
                    this.showSuccessUpload();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Actividad creada exitosamente',
                    });
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al crear la actividad',
                    });
                    console.error('Error al crear la actividad', err);
                },
            });
        } else {
            console.log('campos requeridos');
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Complete el formulario correctamente',
            });
        }
    }

    editarActividad(): void {
        this.loading = true;
        if (this.actividadForm) {
            const formValue = this.actividadForm.value;
            const actividadData = {
                quota_limit: formValue.quota_limit,
                location: formValue.location,
                periods_id: formValue.periods_id.id,
                teachers_id: formValue.teachers_id.id,
                activities_id: formValue.activities_id.id,
                type_of_groups_id: formValue.type_of_groups_id.id,
                schedules: formValue.schedules.map((schedule: any) => ({
                    day: schedule.day,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time,
                })),
            };
            console.log(actividadData);

            this.gruposService.editarGrupo(this.id, actividadData).subscribe({
                next: (response) => {
                    this.loading = false;
                    this.showSuccessUpload();

                    this.router.navigate(['/modules/grupos']);
                },
                error: (err) => {
                    this.loading = false;
                    this.showError();
                    console.error('Error al crear la actividad', err);
                },
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Complete el formulario correctamente',
            });
        }
    }

    onSubmit(): void {
        if (this.isEdit) {
            this.editarActividad();
        } else {
            this.crearGrupo();
        }
    }

    onFileSelect(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.base64Image = reader.result as string;
            this.actividadForm.patchValue({
                image: this.base64Image,
            });
            this.messageService.add({
                severity: 'info',
                summary: 'Éxito',
                detail: 'Archivo subido',
            });
        };
        reader.readAsDataURL(file);
    }
    showSuccess() {
        this.toastr.info('Completado', 'Datos cargados');
    }
    showSuccessUpload() {
        this.toastr.success('Completado', 'Datos Actualizados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un error');
    }
}
