import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStudentRoutingModule } from './login-student-routing.module';
import { LoginStudentComponent } from './login-student.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        LoginStudentRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginStudentComponent]
})
export class LoginStudentModule { }
