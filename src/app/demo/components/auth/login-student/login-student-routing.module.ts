import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginStudentComponent } from './login-student.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginStudentComponent }
    ])],
    exports: [RouterModule]
})
export class LoginStudentRoutingModule { }
