import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposStudentRoutingModule } from './grupos-student-routing.module';
import { GruposStudentComponent } from './grupos-student.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
    imports: [
        CommonModule,
        GruposStudentRoutingModule,
        ButtonModule,
        CardModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        TableModule,
        NgxLoadingModule.forRoot({}),
    ],
    bootstrap: [GruposStudentComponent],
    declarations: [GruposStudentComponent],
})
export class GruposStudentModule {}
