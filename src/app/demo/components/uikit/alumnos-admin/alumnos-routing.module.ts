import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlumnosAdminComponent } from './alumnos-admin.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: AlumnosAdminComponent }]),
    ],
    exports: [RouterModule],
})
export class AlumnosAdminRoutingModule {}
