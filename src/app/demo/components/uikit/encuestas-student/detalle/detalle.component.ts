import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncuestasService } from 'src/app/services/encuestas/encuestas.service';

@Component({
    selector: 'app-detalle',

    templateUrl: './detalle.component.html',
    styleUrl: './detalle.component.scss',
})
export class DetalleComponent implements OnInit {
    encuestaId: string;
    loading = false;
    encuesta: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private Encuesta: EncuestasService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.loading = true;
        this.Encuesta.getEncuestaID(id.toString()).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccess();
                    this.encuesta = response.data;
                } else {
                    this.showError();
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error fetching activities:', error);
                this.showError();
            },
            complete: () => {
                this.loading = false;
            },
        });
    }
    showSuccess() {
        this.toastr.info('Completado', 'Datos Cargados');
    }
    showSuccessUpdate() {
        this.toastr.success('Completado', 'Datos Cargados');
    }
    showError() {
        this.toastr.error('Error', 'Ocurrio un Error');
    }
}
