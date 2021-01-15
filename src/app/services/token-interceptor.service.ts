import { Injectable, Injector } from "@angular/core";
import { HttpClient, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class tokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req, next) {
        let myAuthService = this.injector.get(AuthService);
        let tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${myAuthService.getToken()}`
            }
        })
        return next.handle(tokenizedReq)
    }

}