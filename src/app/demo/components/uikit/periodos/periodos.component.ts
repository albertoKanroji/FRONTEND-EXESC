import { Component, ElementRef, ViewChild } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividades';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrl: './periodos.component.scss'
})
export class PeriodosComponent {
    actividades: Actividad[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(private actividadesService: PeriodosService) { }

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
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }

      clear(table: any) {
        table.clear();
      }
}
