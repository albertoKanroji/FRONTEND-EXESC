import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesRoutingModule } from './docentes-routing.module';
import { DocentesComponent } from './docentes.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		DocentesRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [DocentesComponent]
})
export class DocentesModule { }
