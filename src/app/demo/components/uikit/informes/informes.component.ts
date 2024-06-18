import { Component, ElementRef, ViewChild } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividades';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';
import * as FileSaver from 'file-saver';
import { EvaluacionesService } from 'src/app/services/evaluaciones/evaluaciones.service';

@Component({
    selector: 'app-informes',
    templateUrl: './informes.component.html',
    styleUrl: './informes.component.scss',
})
export class InformesComponent {
    actividades: Actividad[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(
        private actividadesService: PeriodosService,
        private envioDatosService: EvaluacionesService
    ) {}

    ngOnInit(): void {
        this.actividadesService.getPeriodos().subscribe(
            (data: any) => {
                if (data.success) {
                    this.actividades = data.data;
                    console.log('Actividades:', this.actividades);
                }
                this.loading = false;
            },
            (error) => {
                console.error('Error al obtener las actividades:', error);
                this.loading = false;
            }
        );
    }
    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: any) {
        table.clear();
    }

    obtenerInforme(id: number) {
        this.loading = true;
        console.log('Buscar informe para el grupo con ID:', id);
        this.envioDatosService.generatePdfInformes(id).subscribe({
            next: (data: Blob) => {
                const file = new File([data], 'students.pdf', {
                    type: 'application/pdf',
                });
                this.loading = false;
                FileSaver.saveAs(file, 'groups.pdf'); // Trigger browser "Save As" dialog
            },
            error: (error) => {
                this.loading = false;
                console.error('Error al obtener el informe en PDF:', error);
                // Handle errors appropriately, e.g., display an error message to the user
            },
        });
    }
}
