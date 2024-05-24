import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/login/admin/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const profile = this.authService.getUserProfile();
        const allowedRoles = next.data['allowedRoles'] as Array<string>;
console.log(allowedRoles)
        console.log(3)
        if (allowedRoles.includes(profile)) {
            return true;
        } else {
            this.router.navigate(['/unauthorized']);
            return false;
        }
    }
}
