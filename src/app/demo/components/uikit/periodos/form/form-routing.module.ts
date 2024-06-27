import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';
const routes: Routes = [
    { path: '', component: FormComponent },
    { path: ':id', component: FormComponent }, // Ruta para manejar el ID opcional
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormPeriodoRoutingModule {}
