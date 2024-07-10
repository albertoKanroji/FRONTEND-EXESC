import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle.component';
const routes: Routes = [
    { path: 'modules/alumno/encuesta/:id', component: DetalleComponent },
    // Otras rutas aquí
];
@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: DetalleComponent }]),
    ],
    exports: [RouterModule],
})
export class DetalleRoutingModule {}
