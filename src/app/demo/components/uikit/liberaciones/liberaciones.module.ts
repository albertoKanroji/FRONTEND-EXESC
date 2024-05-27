import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiberacionesRoutingModule } from './liberaciones-routing.module';
import { LiberacionesComponent } from './liberaciones.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		LiberacionesRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [LiberacionesComponent]
})
export class LiberacionesModule { }
