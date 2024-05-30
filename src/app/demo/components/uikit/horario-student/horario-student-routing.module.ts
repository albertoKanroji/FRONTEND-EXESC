import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HorarioStudentComponent } from './horario-student.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: HorarioStudentComponent }
	])],
	exports: [RouterModule]
})
export class HorarioStudentRoutingModule { }
