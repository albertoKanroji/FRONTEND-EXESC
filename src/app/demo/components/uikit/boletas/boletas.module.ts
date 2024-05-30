import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoletasRoutingModule } from './boletas-routing.module';
import { BoletasComponent } from './boletas.component';
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
        BoletasRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
    ],
    declarations: [BoletasComponent],
})
export class BoletasModule {}
