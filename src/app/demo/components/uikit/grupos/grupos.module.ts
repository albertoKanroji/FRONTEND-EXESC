import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        GruposRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
    ],
    declarations: [GruposComponent],
})
export class GruposModule {}
