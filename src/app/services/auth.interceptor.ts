import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor{

    intercept(originalReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       const idToken = localStorage.getItem("idToken");
       if(idToken){
           const clonedReq = originalReq.clone({
               headers: originalReq.headers.set("Authorization", "Bearer " + idToken)
           });
           next.handle(clonedReq);
       }
       else{
           return next.handle(originalReq); // ritorna la request invariata
       }
    }
    
}