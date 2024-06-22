import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginTeacherComponent } from './login-teacher.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: LoginTeacherComponent }]),
    ],
    exports: [RouterModule],
})
export class LoginTeacherRoutingModule {}
