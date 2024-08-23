import { Component, ElementRef, ViewChild } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividades';
import { DocentesService } from 'src/app/services/docentes/docentes.service';

@Component({
  selector: 'app-jefes',

  templateUrl: './jefes.component.html',
  styleUrl: './jefes.component.scss'
})
export class JefesComponent {
    actividades: any[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(private actividadesService: DocentesService) { }

    ngOnInit(): void {
      this.actividadesService.getJefes().subscribe(
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
