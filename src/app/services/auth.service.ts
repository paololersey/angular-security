
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "../model/user";
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";
import * as moment from 'moment';

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: ''
};

const AUTH_CONFIG = {
    clientID: 'UXJsqUbYmeogso4xylT2zXDLrsyETMuA',
    domain: "dev-9m0grv42.us.auth0.com"
};


@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: 'https://localhost:4200/lessons'
    });

    private userSubject = new BehaviorSubject<User>(undefined);

    user$: Observable<User> = this.userSubject.asObservable().pipe(filter(user => !!user));

    constructor(private http: HttpClient, private router: Router) {

    }

    login() {
        this.auth0.authorize();
    }

    signUp() {

    }

    retrieveAuth0InfoFromUrl(){
        this.auth0.parseHash( (err, authResult) => {
            if(err){
                console.error("could not parse the hash", err )
                return;
            }
            else if(authResult && authResult.idToken){
                window.location.hash = ''; // clear the url
                console.log("Authentication has a token", authResult )
                this.setSession(authResult);
                this.auth0.client.userInfo(authResult.accessToken, (err, userProfile) =>{
                    if(err){
                        console.error("could get user infos", err )
                        return;
                    }
                    console.log(userProfile)
                } )
            }
            console.log(authResult)
           
            
        })
    }

    logout() {
        localStorage.removeItem("idToken");
        localStorage.removeItem("expiresAt");
        this.router.navigate(['/lessons']);
    }

    private setSession(authResult){
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem("idToken", authResult.idToken);
        localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
    }

    public isLoggedIn() {
       
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration(){
        const expiration=  localStorage.getItem("expiresAt");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}







