
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('access_token')) {
            console.log("PODES");
            return true;
        }
        console.log("NAO PODES");
        this.router.navigate(['register']);
        return false;
    }

}
