import { Component, ElementRef, ViewChild } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividades';
import { GruposService } from 'src/app/services/grupos/grupos.service';

@Component({
  selector: 'app-grupos',

  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss'
})
export class GruposComponent {
    actividades: any[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(private actividadesService: GruposService) { }

    ngOnInit(): void {
      this.actividadesService.getGroups().subscribe(
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
