import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PeriodosComponent } from './periodos.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PeriodosComponent }
	])],
	exports: [RouterModule]
})
export class PeriodosRoutingModule { }
