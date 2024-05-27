import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LiberacionesComponent } from './liberaciones.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LiberacionesComponent }
	])],
	exports: [RouterModule]
})
export class LiberacionesRoutingModule { }
