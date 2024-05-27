import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BajasComponent } from './bajas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BajasComponent }
	])],
	exports: [RouterModule]
})
export class BajasRoutingModule { }
