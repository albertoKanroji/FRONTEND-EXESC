import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService, SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';

@Component({
    selector: 'app-alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.scss'],
    providers: [MessageService],
})
export class AlumnosComponent implements OnInit {
    student: any = {};
    countries: any[] = [];
    studentForm: FormGroup;
    loading = false;
    cities: SelectItem[] = [];
    paymentOptions: any[] = [];
    profileImage: string | null = null;
    base64Image: string | null = null;
    constructor(
        private alumnosService: AlumnosService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.studentForm = this.fb.group({
            username: ['', Validators.required],
            password: [''],
            name: [{ value: '', disabled: true }],
            last_name: [{ value: '', disabled: true }],
            mother_last_name: [{ value: '', disabled: true }],
            email: [
                { value: '', disabled: true },
                [Validators.required, Validators.email],
            ],
            control_number: [{ value: '', disabled: true }],
            status: [{ value: false, disabled: true }],
            profile: [{ value: '', disabled: true }],
            careers_id: [{ value: null, disabled: true }],
            image: [null, Validators.required],
        });
        const studentId = localStorage.getItem('id');
        if (studentId) {
            this.getStudentById(parseInt(studentId, 10));
        } else {
            console.log('No ID found in localStorage');
        }
    }

    getStudentById(id: number): void {
        this.loading = true;
        this.alumnosService.getStudentById(id).subscribe(
            (response) => {
                if (response.success) {
                    this.showSuccess();
                    this.loading = false;
                    this.studentForm.patchValue(response.data);

                    // Si hay una imagen en la respuesta, actualiza profileImage
                    if (response.data.image) {
                        this.profileImage = response.data.image;
                    }

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Student data loaded successfully',
                    });
                }
                console.log('Student data:', response);
            },
            (error) => {
                this.showError();
                this.loading = false;
                console.error('Error fetching student data:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load student data',
                });
            }
        );
    }

    onFileSelect(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.base64Image = reader.result as string;
            this.studentForm.patchValue({
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

    updateData(): void {
        if (this.studentForm.valid) {
            const formValue = this.studentForm.getRawValue();
            const alumnoData = {
                username: formValue.username,
                password: formValue.password,
                image: formValue.image,
            };
            console.log(alumnoData);
            const formData = new FormData();
            for (const key in alumnoData) {
                if (alumnoData.hasOwnProperty(key)) {
                    formData.append(key, alumnoData[key]);
                }
            }

            this.alumnosService.updateStudent(1, alumnoData).subscribe({
                next: (response) => {
                    const studentId = localStorage.getItem('id');
                    if (studentId) {
                        this.getStudentById(parseInt(studentId, 10));
                    } else {
                        console.log('No ID found in localStorage');
                    }
                    this.showSuccessUpdate();
                },
                error: (err) => {
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
    showSuccess() {
        this.toastr.info('Completado', 'Datos Cargados');
    }
    showSuccessUpdate() {
        this.toastr.success('Completado', 'Datos Cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un Error');
    }
}
