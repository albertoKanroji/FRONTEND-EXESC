import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EncuestaComponent } from './encuesta.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EncuestaComponent }
	])],
	exports: [RouterModule]
})
export class EncuestasProfesoresAlumoosRoutingModule { }
