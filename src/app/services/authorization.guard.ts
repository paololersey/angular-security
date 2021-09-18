import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { intersection } from "lodash";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import {first, map} from 'rxjs/operators';

export class AuthorizationGuard implements CanActivate {

    constructor(private allowedRoles: string[], private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.user$.pipe(
            map(user => intersection(this.allowedRoles, user.roles).length > 0),
            first());
    }

}