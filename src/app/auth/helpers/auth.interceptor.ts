import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = req.url.split('/');
        const apiUrl: Array<any> = environment.AuthAPI.split('/');
        // console.log(apiUrl);
        // console.log(requestUrl);
        
        let loginUrl = `${environment.API}auth/login`;
        let registerUrl = `${environment.API}auth/signup`;
        // console.log(loginUrl);
        // console.log(req.url);
        
        
        if(requestUrl[2] === apiUrl[2]
            // && requestUrl[4] === apiUrl[4]
            && req.url !== loginUrl
            && req.url !== registerUrl){
                if(localStorage.getItem('currentUser')){
                    const currentUser = localStorage.getItem('currentUser');
                    const token = JSON.parse(currentUser).token;
                    // console.log(token);
                    if(token){
                        // console.log(token)
                        const headers = req.headers
                        .set('Authorization', `Bearer ${token}`);
                        const authReq = req.clone({ headers });
                        return next.handle(authReq);
                    }
                }else{
                    return next.handle(req);
                }
        }else{
            return next.handle(req);
        }
    }
}