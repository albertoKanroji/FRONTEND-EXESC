import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BajasRoutingModule } from './bajas-routing.module';
import { BajasComponent } from './bajas.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		BajasRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [BajasComponent]
})
export class BajasModule { }
