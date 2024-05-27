import { Component, ElementRef, ViewChild } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividades';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';

@Component({
  selector: 'app-docentes',

  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.scss'
})
export class DocentesComponent {
    actividades: Actividad[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(private actividadesService: DocentesService) { }

    ngOnInit(): void {
      this.actividadesService.getDocentes().subscribe(
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
