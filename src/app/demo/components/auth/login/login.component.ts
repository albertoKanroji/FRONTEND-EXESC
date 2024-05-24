import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/login/admin/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
         private router: Router
        ) { }
    loginForm: FormGroup;
    isSubmitted = false;
    loading = false;
    errorMessage: string | null = null;


    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe: [false]
      });
    }

    onSubmit(): void {
      this.isSubmitted = true;
      this.errorMessage = null;
console.log(this.loginForm.value)
      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      const { email, password, rememberMe } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
            this.loading = false;
            this.authService.setToken(response.data.token);
            this.authService.setUserModulos(response.data.modulos);
            localStorage.setItem('modulos', JSON.stringify(response.data.modulos));
            this.router.navigate(['/dashboard']);
            console.log(response)
          },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
}
