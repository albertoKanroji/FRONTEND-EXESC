import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodosRoutingModule } from './periodos-routing.module';
import { PeriodosComponent } from './periodos.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		PeriodosRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [PeriodosComponent]
})
export class PeriodosModule { }
