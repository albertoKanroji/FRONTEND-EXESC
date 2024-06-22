import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GruposStudentComponent } from './grupos-student.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: GruposStudentComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class GruposStudentRoutingModule {}
