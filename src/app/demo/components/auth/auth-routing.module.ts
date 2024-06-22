import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'error',
                loadChildren: () =>
                    import('./error/error.module').then((m) => m.ErrorModule),
            },
            {
                path: 'access',
                loadChildren: () =>
                    import('./access/access.module').then(
                        (m) => m.AccessModule
                    ),
            },
            {
                path: 'login',
                loadChildren: () =>
                    import('./login/login.module').then((m) => m.LoginModule),
            },
            {
                path: 'student',
                loadChildren: () =>
                    import('./login-student/login-student.module').then(
                        (m) => m.LoginStudentModule
                    ),
            },
            {
                path: 'teacher',
                loadChildren: () =>
                    import('./login-teacher/login.module').then(
                        (m) => m.LoginTeacherModule
                    ),
            },
            {
                path: 'resgister',
                loadChildren: () =>
                    import('./register/register.module').then(
                        (m) => m.RegisterModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
