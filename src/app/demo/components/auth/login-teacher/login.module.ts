import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTeacherRoutingModule } from './login-routing.module';
import { LoginTeacherComponent } from './login-teacher.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        LoginTeacherRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginTeacherComponent],
})
export class LoginTeacherModule {}
