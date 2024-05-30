import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EncuestasStudentComponent } from './encuestas-student.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EncuestasStudentComponent }
	])],
	exports: [RouterModule]
})
export class EncuestasStudentRoutingModule { }
