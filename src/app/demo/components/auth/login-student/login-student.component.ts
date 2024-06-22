import { Component } from '@angular/core';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/login/admin/auth.service';
import { Router } from '@angular/router';
import { AuthStudentService } from '../../../../services/login/student/auth-student.service';
import { emailDomainValidator } from './email-domain.validator';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-student',

    templateUrl: './login-student.component.html',
    styleUrl: './login-student.component.scss',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    providers: [MessageService],
})
export class LoginStudentComponent {
    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private toastr: ToastrService
    ) {}
    loginForm: FormGroup;
    isSubmitted = false;
    loading = false;
    errorMessage: string | null = null;

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    emailDomainValidator('lcardenas.tecnm.mx'),
                ],
            ],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
    }

    onSubmit(): void {
        this.isSubmitted = true;
        this.errorMessage = null;
        console.log(this.loginForm.value);
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        const { email, password, rememberMe } = this.loginForm.value;
        this.authService.loginStudent(email, password).subscribe(
            (response) => {
                this.showSuccess();
                this.loading = false;
                this.authService.setToken(response.data.token);
                console.log(response.data.cliente.image);
                this.authService.setUserImage(
                    response.data.cliente.image,
                    response.data.cliente.name
                );
                this.authService.setIdStudent(
                    response.data.cliente.id.toString()
                );
                this.authService.setUserModulos(response.data.modulos);
                localStorage.setItem(
                    'modulos',
                    JSON.stringify(response.data.modulos)
                );

                this.router.navigate(['/dashboard']);
                console.log(response);
                console.log(response.data.cliente.profile);
            },
            (error) => {
                this.showError();
                this.loading = false;
                this.errorMessage = 'Invalid email or password';
            }
        );
    }
    showSuccess() {
        this.toastr.info('Completado', 'Incio de sesion Exitoso');
    }
    showError() {
        this.toastr.error('Error', 'Credenciales incorrectas');
    }
}
