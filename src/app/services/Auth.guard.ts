import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AdminServices } from './admin.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private myAuthService: AuthService, private myRouter: Router) { }

    canActivate(): boolean {
        if (this.myAuthService.isLoggedin()) {
            if (localStorage.getItem('type') == 'patient') {
                return true
            }
            if (localStorage.getItem('type') == 'admin') {
                this.myRouter.navigate(['/admin'])
                return false
            }
            if (localStorage.getItem('type') == 'doctor') {
                this.myRouter.navigate(['/dashboard', localStorage.getItem('id')])
                return false
            }
            if (localStorage.getItem('type') == 'travelAgent') {
                this.myRouter.navigate(['/Tdashboard', localStorage.getItem('id')])
                return false
            }

        } else {
            this.myRouter.navigate(['/home'])
            return true
        }
    }

}