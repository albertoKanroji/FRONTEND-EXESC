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

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.loading = true;
        this.Encuesta.getAlumnoQuestions().subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccess();
                    this.encuesta = response.data; // Asignar directamente response.data a encuesta
                    this.encuesta.forEach((question) => {
                        question.selectedOption = null;
                        question.textInput = '';
                        // Inicializar selectedOption
                        console.log('Options for question:', question.options); // Imprime opciones
                    });
                } else {
                    this.showError();
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error fetching questions:', error);
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
    onOptionChange(event: any, questionId: string) {
        const question = this.encuesta.find(q => q.id === questionId);
        if (question) {
            // Solo almacena el id de la opción seleccionada
            question.selectedOptionId = event.value.id;
            console.log(`Option selected for question ${questionId}:`, question.selectedOptionId);
        }
    }


    guardarEncuesta() {
        const id_alumno = localStorage.getItem('id');
        const id_encuesta = localStorage.getItem('id_encuesta');
        const id = +this.route.snapshot.paramMap.get('id');
        // Verificar que todas las preguntas tengan respuestas
        const responses = this.encuesta.map(question => {
            return {
                question_id: question.id,
               option_id: question.selectedOptionId , // Si no hay opción seleccionada, enviar null
                //text: question.question === 'Observaciones' ? question.textInput.trim() || null : null // Enviar texto o null si no hay entrada
            };
        });

        // if (!allAnswered) {
        //     this.toastr.error('Error', 'Por favor, responda todas las preguntas');
        //     return;
        // }
        const payload = {
            surveys_id: id  ,
            responses: responses,
            teachers_id: 1, // Ajustar según tu lógica
            students_id: id_alumno  // Ajustar según tu lógica
        };

        console.log('Datos de la encuesta a enviar:', payload);


        // Aquí puedes llamar a tu servicio para guardar la encuesta
        this.Encuesta.saveResponses(payload).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.showSuccessUpdate();
                } else {
                    this.showError();
                }
            },
            error: (error) => {
                console.error('Error saving survey:', error);
                this.showError();
            },
        });
    }

}
