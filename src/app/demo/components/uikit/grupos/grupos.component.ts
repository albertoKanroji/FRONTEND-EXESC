import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actividad } from 'src/app/interfaces/actividades';
import { GruposService } from 'src/app/services/grupos/grupos.service';

@Component({
    selector: 'app-grupos',

    templateUrl: './grupos.component.html',
    styleUrl: './grupos.component.scss',
})
export class GruposComponent {
    actividades: Actividad[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(
        private actividadesService: GruposService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.actividadesService.getGroups().subscribe(
            (data: any) => {
                if (data.success) {
                    this.showSuccess();
                    this.actividades = data.data;
                    console.log('Actividades:', this.actividades);
                }
                this.loading = false;
            },
            (error) => {
                this.showError();
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
    showSuccess() {
        this.toastr.info('Completado', 'Datos cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un error');
    }
}
