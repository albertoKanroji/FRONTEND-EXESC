import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Actividad } from 'src/app/interfaces/actividades';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-actividades',

    templateUrl: './actividades.component.html',
    styleUrl: './actividades.component.scss',
})
export class ActividadesComponent implements OnInit {
    actividades: Actividad[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    constructor(
        private actividadesService: ActividadesService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.actividadesService.getActividades().subscribe({
            next: (data: any) => {
                if (data.success) {
                    this.showSuccess();
                    this.actividades = data.data;
                    console.log('Actividades:', this.actividades);
                }
                this.loading = false;
            },
            error: (error) => {
                this.showError();
                console.error('Error al obtener las actividades:', error);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            },
        });
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
    navigateToForm(): void {
        this.router.navigate(['modules/actividades/actividades-form']);
    }
    showSuccess() {
        this.toastr.info('Completado', 'Datos cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un error');
    }
}
