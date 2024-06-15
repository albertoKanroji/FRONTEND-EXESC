import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormActividadesComponent } from './form-actividades.component';
const routes: Routes = [
    { path: '', component: FormActividadesComponent },
    { path: ':id', component: FormActividadesComponent }, // Ruta para manejar el ID opcional
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormActividadesRoutingModule {}
