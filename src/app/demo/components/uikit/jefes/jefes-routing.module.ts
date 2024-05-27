import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JefesComponent } from './jefes.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: JefesComponent }
	])],
	exports: [RouterModule]
})
export class JefesRoutingModule { }
