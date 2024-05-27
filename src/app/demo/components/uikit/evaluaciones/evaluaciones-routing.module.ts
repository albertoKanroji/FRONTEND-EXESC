import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EvaluacionesComponent } from './evaluaciones.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EvaluacionesComponent }
	])],
	exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }
