import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {
    
  }

  ngOnInit() {
    this.generateToken();
  }

  getAuth() {
    const clientId = '94ae63fe83f2425aacff1c2e78a88160';

    this.redirectToAuthCodeFlow(clientId);
  }

  async redirectToAuthCodeFlow(clientId: string) {
    const verifier = this.generateCodeVerifier(128);
    const challenge = this.generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://localhost:4200/login/');
    params.append('scope', 'user-read-private user-read-email user-top-read user-read-playback-state user-modify-playback-state streaming');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', await challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  generateCodeVerifier(length: number) {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await (<any>window).crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  generateToken() {
    const clientId = '94ae63fe83f2425aacff1c2e78a88160';
    const params = new URLSearchParams((<any>window).location.search);
    const code = params.get("code");

    if (!code) {
      console.log("No code");
    } else {
      this.getAccessToken(clientId, code);
    }
  }

  async getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");
    // const router = inject(Router); 

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:4200/login/");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    this.loginService.accessToken$ = access_token;
    this.router.navigate(['/home']);
  }
}
