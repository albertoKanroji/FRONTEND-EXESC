import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocentesService } from 'src/app/services/docentes/docentes.service';

@Component({
    selector: 'app-form',

    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
})
export class FormComponent {
    teacherForm: FormGroup;
    profileImage: string | null = null;
    teacherId: number;
    isEditMode: boolean = false;
    loading = false;
    base64Image: string | null = null;
    isEdit: boolean = false;
    id: string | null = null;
    constructor(
        private fb: FormBuilder,
        private teacherService: DocentesService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.teacherForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            last_name: ['', [Validators.required, Validators.maxLength(255)]],
            mother_last_name: [
                '',
                [Validators.required, Validators.maxLength(255)],
            ],
            gender: ['', [Validators.required, Validators.maxLength(45)]],
            abbreviated_title: [
                '',
                [Validators.required, Validators.maxLength(45)],
            ],
            curp: ['', [Validators.required, Validators.maxLength(45)]],
            rfc: ['', [Validators.required, Validators.maxLength(45)]],
            username: ['', [Validators.required, Validators.maxLength(45)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(255),
                ],
            ],
            profile_picture: [''],
            signature: [''],
            profile: ['', Validators.maxLength(45)],
            departments_id: ['', [Validators.required]],
        });
    }
    ngOnInit(): void {
        // this.route.params.subscribe((params) => {
        //     if (params['id']) {
        //         this.loading = true;
        //         this.teacherId = params['id'];
        //         this.isEditMode = true;
        //         this.teacherService
        //             .getTeacher(this.teacherId)
        //             .subscribe((teacher) => {
        //                 this.loading = false;
        //                 this.teacherForm.patchValue(teacher);
        //             });
        //     }
        // });

        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            this.isEdit = this.id !== null;
            console.log(this.id);
            if (this.isEdit) {
                this.loadTeacher(this.id);
                console.log('Editando actividad con ID:', this.id);
            } else {
                console.log('Creando nueva actividad');
            }
        });
    }
    loadTeacher(id) {
        this.teacherService.getTeacher(id).subscribe({
            next: (response) => {
                this.showSuccess();
                const data = response.data;
                console.log(data);
                this.teacherForm.patchValue({
                    name: data.name,
                    last_name: data.last_name,
                    mother_last_name: data.mother_last_name,
                    gender: data.gender,
                    abbreviated_title: data.abbreviated_title,
                    curp: data.curp,
                    rfc: data.rfc,
                    username: data.username,
                    email: data.email,
                    profile_picture: data.profile_picture,
                    signature: data.signature,
                    profile: data.profile,
                    departments_id: data.departments_id,
                });

                if (data.profile_picture) {
                    // Si hay una imagen, cargarla en el formulario

                    this.profileImage = response.data.profile_picture;
                    // Suponiendo que la imagen ya está en base64
                } else {
                    // Set the profile image to null if not available
                    this.profileImage = null;
                }
            },
            error: (err) => {
                this.showError();
                console.error('Error al obtener la actividad', err);
            },
        });
    }

    onSubmit(): void {
        console.log(this.teacherForm.value);
        this.loading = true;
        if (this.teacherForm.valid) {
            console.log(this.isEdit);
            if (this.isEdit) {
                this.teacherService
                    .updateTeacher(this.id, this.teacherForm.value)
                    .subscribe({
                        next: () => {
                            this.showSuccess();
                            this.router.navigate(['/modules/docentes']);
                        },
                        error: (err) => {
                            console.error('Error updating teacher:', err);
                            this.showError();
                        },
                        complete: () => {
                            this.loading = false;
                        },
                    });
            } else {
                this.teacherService
                    .createTeacher(this.teacherForm.value)
                    .subscribe({
                        next: () => {
                            this.showSuccess();
                            this.router.navigate(['/modules/docentes']);
                        },
                        error: (err) => {
                            this.loading = false;
                            console.error('Error creating teacher:', err);
                            this.showError();
                        },
                        complete: () => {
                            this.loading = false;
                        },
                    });
            }
        } else {
            this.loading = false;
        }
    }

    showSuccess() {
        this.toastr.info('Completado', 'Datos cargados');
    }
    showSuccessImage() {
        this.toastr.info('Completado', 'Imagen Subida');
    }
    showError() {
        this.loading = false;
        this.toastr.error('Error', 'Ocurrio un error');
    }
    onFileSelect(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.profileImage = e.target.result;
                this.base64Image = reader.result as string;
                this.teacherForm.patchValue({
                    profile_picture: this.base64Image,
                });
                console.log(this.base64Image);
                this.showSuccessImage();
            };
            reader.readAsDataURL(file);
        }
    }
}
