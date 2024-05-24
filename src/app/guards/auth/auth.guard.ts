import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/login/admin/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const isAuthenticated = this.authService.isAuthenticated();
        const profile = this.authService.getUserProfile();
        if (isAuthenticated) {
            // Evitar redirigir al dashboard si ya está en una ruta protegida
            if (state.url.startsWith('/auth')) {
              this.router.navigate(['/dashboard']);
            }
            return true;
          } else {
            // Evitar redirigir al login si ya está en una ruta pública
            if (!state.url.startsWith('/auth')) {
              this.router.navigate(['/auth/login']);
            }
            return false;
          }

  }
}
