import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivityService } from './services/login/auth/activity.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private activityService: ActivityService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.activityService.startMonitoring()
    }
}
