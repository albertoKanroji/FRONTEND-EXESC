import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JefesRoutingModule } from './jefes-routing.module';
import { JefesComponent } from './jefes.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		JefesRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [JefesComponent]
})
export class JefesModule { }
