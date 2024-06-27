import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { DocentesService } from 'src/app/services/docentes/docentes.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { PeriodosService } from 'src/app/services/periodos/periodos.service';

@Component({
    selector: 'app-form',

    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    providers: [MessageService],
})
export class FormComponent {
    actividadForm: FormGroup;
    isEdit: boolean = false;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private actividadesService: ActividadesService,
        private gruposService: GruposService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private toastr: ToastrService,
        private periodosService: PeriodosService,
        private docentesService: DocentesService
    ) {
        this.actividadForm = this.fb.group({
            start_period: ['', [Validators.required]],
            end_period: ['', [Validators.required, Validators.maxLength(255)]],
            registration_start: [null, [Validators.required]],
            registration_end: [null, [Validators.required]],
            selectiv_start: [null, [Validators.required]],
            selectiv_end: [null, [Validators.required]],
            periodscol: [null, [Validators.required]],
            status: [null, [Validators.required]],
        });
    }

    onSubmit() {}
}
