import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGComponent } from './form.component';
const routes: Routes = [
    { path: '', component: FormGComponent },
    { path: ':id', component: FormGComponent }, // Ruta para manejar el ID opcional
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormRoutingModule {}
