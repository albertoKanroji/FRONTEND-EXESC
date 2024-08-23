import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncuestaResponse } from 'src/app/interfaces/encuesta';
import { EncuestasService } from 'src/app/services/encuestas/encuestas.service';

@Component({
    selector: 'app-detalle',

    templateUrl: './detalle.component.html',
    styleUrl: './detalle.component.scss',
})
export class DetalleComponent implements OnInit {
    encuestaId: string;
    loading = false;
    encuesta: any = {};

    selectedOptions: any[] = [];
    constructor(
        private route: ActivatedRoute,
        private Encuesta: EncuestasService,
        private toastr: ToastrService
    ) {}
    guardarEncuesta() {
        const selectedOptions = this.encuesta.questions.map(question => ({
            question_id: question.id,
            option_id: question.selectedOption ? question.selectedOption.id : null
          }));

          const payload = {
            surveys_id: this.encuesta.id,
            responses: selectedOptions,
            teachers_id: 1, // Reemplaza con el ID del profesor
            students_id: 1  // Reemplaza con el ID del estudiante
          };

          this.Encuesta.saveResponses(payload).subscribe({
            next: (response) => {
              if (response.success) {
                this.toastr.success('Completado', 'Respuestas enviadas correctamente');
              } else {
                this.toastr.error('Error', 'Error al enviar respuestas');
              }
            },
            error: (error) => {
              console.error('Error al guardar respuestas:', error);
              this.toastr.error('Error', 'Error de comunicación con el servidor');
            }
          });

    }
    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.loading = true;
        this.Encuesta.getEncuestaID(id.toString()).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccess();
                    this.encuesta = response.data;
                    this.encuesta.questions.forEach(question => {
                        question.selectedOption = null;
                    });

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
    onOptionChange(event: any, questionId: number) {
        // Encuentra la pregunta correspondiente y actualiza su opción seleccionada
        const question = this.encuesta.questions.find(q => q.id === questionId);
        if (question) {
            question.selectedOption = event.value;
        }
        console.log('Opción seleccionada:', question);
    }

}
