import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocentesComponent } from './docentes.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DocentesComponent }
	])],
	exports: [RouterModule]
})
export class DocentesRoutingModule { }
