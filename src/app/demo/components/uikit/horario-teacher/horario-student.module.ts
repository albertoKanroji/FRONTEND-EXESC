import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarioStudentRoutingModule } from './horario-student-routing.module';
import { HorarioStudentComponent } from './horario-student.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        HorarioStudentRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
    ],
    declarations: [HorarioStudentComponent],
})
export class HorarioStudentModule {}
