import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoletasComponent } from './boletas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BoletasComponent }
	])],
	exports: [RouterModule]
})
export class BoletasRoutingModule { }
