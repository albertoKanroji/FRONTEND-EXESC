import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
    selector: 'app-form-actividades',

    templateUrl: './form-actividades.component.html',
    styleUrl: './form-actividades.component.scss',
    providers: [MessageService],
})
export class FormActividadesComponent {
    actividadForm: FormGroup;
    id: string | null = null;
    periodos: any[] = [];
    actividades: any[] = [];
    isEdit: boolean = false;
    uploadedFiles: any[] = [];
    base64Image: string | null = null;
    public loading = false;
    constructor(
        private route: ActivatedRoute,
        private actividadesService: ActividadesService,
        private gruposService: GruposService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router
    ) {
        this.actividadForm = this.fb.group({
            name: ['', Validators.required],
            type_of_activities_id: [null, Validators.required],
            image: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.loadGrupos();
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            this.isEdit = this.id !== null;
            if (this.isEdit) {
                this.loadActividad(this.id);
                console.log('Editando actividad con ID:', this.id);
            } else {
                console.log('Creando nueva actividad');
            }
        });
    }
    loadActividad(id: string): void {
        this.actividadesService.getActivityById(id).subscribe({
            next: (response) => {
                const data = response.data;
                console.log(data);
                this.actividadForm.patchValue({
                    name: data.name,
                    type_of_activities_id: {
                        id: data.type_of_activities_id,
                    },
                });
                if (data.image) {
                    // Si hay una imagen, cargarla en el formulario
                    this.base64Image = data.image; // Suponiendo que la imagen ya está en base64
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Imagen cargada',
                        detail: 'La imagen de la actividad ha sido cargada',
                    });
                }
            },
            error: (err) => {
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

    crearActividad(): void {
        if (this.actividadForm.valid) {
            const formValue = this.actividadForm.value;
            console.log(formValue);
            const actividadData = {
                name: formValue.name,
                type_of_activities_id: Number(
                    formValue.type_of_activities_id.id
                ), // Enviar solo el ID
                image: formValue.image,
            };
            this.actividadesService.crearActividad(actividadData).subscribe({
                next: (response) => {
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
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Complete el formulario correctamente',
            });
        }
    }

    editarActividad(): void {
        this.loading = true;
        if (this.actividadForm.valid) {
            const formValue = this.actividadForm.value;
            const actividadData = {
                name: formValue.name,
                type_of_activities_id: Number(
                    formValue.type_of_activities_id.id
                ), // Enviar solo el ID
                image: formValue.image,
            };

            this.actividadesService
                .editarActividad(this.id, actividadData)
                .subscribe({
                    next: (response) => {
                        this.loading = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Actividad editada exitosamente',
                        });
                        this.router.navigate(['/modules/actividades']);
                    },
                    error: (err) => {
                        this.loading = false;
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al editar la actividad',
                        });
                        console.error('Error al editar la actividad', err);
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
            this.crearActividad();
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
}
