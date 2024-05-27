import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

    private timeoutId: any;
    private timeoutDuration = 30 * 60 * 1000; // 30 minutos

    constructor(private router: Router, private authService: AuthService) {
      this.startMonitoring();
    }

    startMonitoring() {
      window.addEventListener('mousemove', this.resetTimeout.bind(this));
      window.addEventListener('mousedown', this.resetTimeout.bind(this));
      window.addEventListener('keypress', this.resetTimeout.bind(this));
      window.addEventListener('scroll', this.resetTimeout.bind(this));
      window.addEventListener('touchstart', this.resetTimeout.bind(this));
      this.resetTimeout();
    }

    resetTimeout() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => this.handleInactivity(), this.timeoutDuration);
    }

    handleInactivity() {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
}
