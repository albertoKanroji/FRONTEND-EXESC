import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/login/admin/auth.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService],
})
export class AppTopBarComponent {
    items!: MenuItem[];
    profileImage: string | null = null;
    profileName: string | null = null;
    showLogoutMenu: boolean = false;
    darkMode = false;

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        const themeLink = document.getElementById(
            'app-theme'
        ) as HTMLLinkElement;
        themeLink.href = this.darkMode
            ? 'assets/layout/styles/theme/lara-dark-indigo/theme.css'
            : 'assets/layout/styles/theme/lara-light-indigo/theme.css';
    }
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private auth: AuthService,
        private messageService: MessageService,
        private toastr: ToastrService
    ) {}
    loadProfileImage(): void {
        this.profileImage = localStorage.getItem('image');
        this.profileName = localStorage.getItem('name');
    }
    logout() {
        this.auth.logout();
        this.showLogoutMenu = false;
        this.showSuccess;
    }
    ngOnInit(): void {
        this.loadProfileImage();
    }
    showSuccess() {
        this.toastr.info('Completado', 'Sesion Cerrada');
    }
    showError() {
        this.toastr.error('Error', 'Credenciales incorrectas');
    }
}
