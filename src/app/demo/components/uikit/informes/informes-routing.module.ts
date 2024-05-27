import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformesComponent } from './informes.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InformesComponent }
	])],
	exports: [RouterModule]
})
export class InformesRoutingModule { }
