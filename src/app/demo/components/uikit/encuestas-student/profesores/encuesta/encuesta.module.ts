import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasProfesoresAlumoosRoutingModule } from './encuesta-routing.module';
import { EncuestaComponent } from './encuesta.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { NgxLoadingModule } from 'ngx-loading';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        EncuestasProfesoresAlumoosRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
        DropdownModule
    ],
    declarations: [EncuestaComponent],
})
export class EncuestasProfesoAlummosModule {}
