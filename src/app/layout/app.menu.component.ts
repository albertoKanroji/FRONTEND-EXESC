import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {AuthService} from "../services/login/admin/auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    profile: string;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        const modulos = this.authService.getUserModulos();
        this.profile = this.authService.getUserProfile();
        console.log(this.profile);

        if (this.profile === 'Estudiante') {
            this.model = [
                {
                    label: 'Estudiante',
                    items: modulos.map(modulo => ({
                        label: modulo.name,
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: [`/${modulo.path}`]
                    }))
                }
            ];
        } else if (this.profile === 'Docente') {
            this.model = [
                {
                    label: 'Docente',
                    items: [
                        { label: 'Mis clases', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/classes'] },
                        { label: 'Evaluaciones', icon: 'pi pi-fw pi-pencil', routerLink: ['/uikit/evaluations'] }
                    ]
                }
            ];
        } else if (this.profile === 'Dev') {
            this.model = [
                {
                    label: 'Developer',
                    items: [
                        { label: 'Proyectos', icon: 'pi pi-fw pi-code', routerLink: ['/uikit/projects'] },
                        { label: 'Tareas', icon: 'pi pi-fw pi-tasks', routerLink: ['/uikit/tasks'] }
                    ]
                }
            ];
        } else {
            this.model = [
                {
                    label: 'Administración',
                    items: modulos.map(modulo => ({
                        label: modulo.name,
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: [`/${modulo.path}`]
                    }))
                }
            ];
        }
    }
}
