import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  isAuthorized: boolean = false;
  loginAuthBS: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loginAuth$ = this.loginAuthBS.asObservable();

  constructor(private loginService: LoginService) {
    // this.generateToken();
  }

  // generateToken() {
  //   const clientId = '94ae63fe83f2425aacff1c2e78a88160';
  //   const params = new URLSearchParams(window.location.search);
  //   const code = params.get("code");

  //   if (!code) {
  //     console.log("No code");
  //   } else {
  //     this.getAccessToken(clientId, code);
  //   }
  // }

  // async getAccessToken(clientId: string, code: string) {
  //   const verifier = localStorage.getItem("verifier");

  //   const params = new URLSearchParams();
  //   params.append("client_id", clientId);
  //   params.append("grant_type", "authorization_code");
  //   params.append("code", code);
  //   params.append("redirect_uri", "http://localhost:4200/callback/");
  //   params.append("code_verifier", verifier!);

  //   const result = await fetch("https://accounts.spotify.com/api/token", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: params
  //   });

  //   const { access_token } = await result.json();
  //   this.loginService.accessToken$ = access_token;
  // }

  verifyAuthorization(): boolean {
    // this.generateToken();

    let authorized = false;
    if (this.loginService.accessToken$ && this.loginService.accessToken$.length > 0) {
      authorized = true;      
    } else {
      authorized = false;
    };
    this.loginAuthBS.next(authorized);

    return authorized
  }
}
