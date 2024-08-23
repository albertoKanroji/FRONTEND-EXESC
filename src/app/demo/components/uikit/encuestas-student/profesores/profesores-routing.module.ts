import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfesoresComponent } from './profesores.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProfesoresComponent }
	])],
	exports: [RouterModule]
})
export class EncuestasProfesoresRoutingModule { }
