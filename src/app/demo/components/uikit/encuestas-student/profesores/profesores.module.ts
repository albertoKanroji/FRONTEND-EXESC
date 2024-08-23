import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesoresComponent } from './profesores.component';
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
        EncuestasProfesoresRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
    ],
    declarations: [ProfesoresComponent],
})
export class EncuestasProfesorModule {}
