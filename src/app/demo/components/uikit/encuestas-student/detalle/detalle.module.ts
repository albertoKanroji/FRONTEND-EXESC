import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleRoutingModule } from './detalle-routing.module';
import { DetalleComponent } from './detalle.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { NgxLoadingModule } from 'ngx-loading';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
@NgModule({
    imports: [
        NgxLoadingModule.forRoot({}),
        CommonModule,
        DetalleRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
        DropdownModule,
        CardModule,
        FieldsetModule,
        PanelModule,
        DividerModule,
    ],
    declarations: [DetalleComponent],
})
export class DetalleModule {}
