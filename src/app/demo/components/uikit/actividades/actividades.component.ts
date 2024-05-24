import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Actividad } from 'src/app/interfaces/actividades';
interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-actividades',


  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.scss'
})
export class ActividadesComponent implements OnInit{
    actividades: Actividad[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(private actividadesService: ActividadesService) { }

    ngOnInit(): void {
      this.actividadesService.getActividades().subscribe(
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
