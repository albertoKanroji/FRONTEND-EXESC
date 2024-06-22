import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasStudentRoutingModule } from './encuestas-studend-routing.module';
import { EncuestasStudentComponent } from './encuestas-student.component';
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
        EncuestasStudentRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
    ],
    declarations: [EncuestasStudentComponent],
})
export class EncuestasStudentModule {}
