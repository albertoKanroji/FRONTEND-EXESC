import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { EncuestasComponent } from './encuestas.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	imports: [
        DropdownModule,
        ReactiveFormsModule,
		CommonModule,
		EncuestasRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
        TableModule,
	],
	declarations: [EncuestasComponent]
})
export class EncuestasModule { }
