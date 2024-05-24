import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActividadesComponent } from './actividades.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ActividadesComponent }
	])],
	exports: [RouterModule]
})
export class ActividadesRoutingModule { }
