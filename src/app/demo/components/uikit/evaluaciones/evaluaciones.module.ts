import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionesRoutingModule } from './evaluaciones-routing.module';
import { EvaluacionesComponent } from './evaluaciones.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		EvaluacionesRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [EvaluacionesComponent]
})
export class EvaluacionesModule { }
