import {
    HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {_throw} from "rxjs/observable/throw";
import {Router} from "@angular/router";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch(error => {
                if (error instanceof HttpErrorResponse && error.status == 404) {
                    this.router.navigateByUrl('/signin', {replaceUrl: true});
                    alert("Seu email ou senha estão incorretos");
                    return new EmptyObservable();
                }
                else
                    return _throw(error);
            });
    }
}

export const HttpErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
};