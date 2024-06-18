import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivityService } from './services/login/auth/activity.service';
import { config } from 'rxjs';
import { AppConfig, LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private activityService: ActivityService,
        private layoutService: LayoutService
    ) {}

    ngOnInit() {
        const config: AppConfig = {
            ripple: false, //toggles ripple on and off
            inputStyle: 'outlined', //default style for input elements
            menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
            colorScheme: 'dark', //color scheme of the template, valid values are "light" and "dark"
            theme: 'lara-dark-indigo', //default component theme for PrimeNG
            scale: 14, //size of the body font size to scale the whole application
        };
        this.primengConfig.ripple = true;
        this.activityService.startMonitoring();
        this.layoutService.config.set(config);
    }
}
