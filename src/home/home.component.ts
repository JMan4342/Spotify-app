import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
// import { SpotifyApi } from "@spotify/web-api-ts-sdk";

// declare global {
//   interface window {
//     onSpotifyWebPlaybackSDKReady: () => void;
//   }
// }

declare var Spotify:any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
access_token: string = '';

  constructor(private homeService: HomeService, 
    private loginService: LoginService) {
    this.access_token = this.loginService.accessToken$;
    // this.initializePlayer();
  }

  ngOnInit() {
    this.initializePlayer();

    this.homeService.getDevices(this.access_token).subscribe({
      next: results => {
        console.log('Devices', results);
      },
      error: err => console.log(err),
    });
  }

  initializePlayer() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    script.addEventListener('load', (e) => {
      console.log(e);
    });
    document.head.appendChild(script);
    (<any>window).onSpotifyWebPlaybackSDKReady = () => {
        const token = this.access_token;
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: (cb: any) => { cb(token); },
            volume: 0.5
        });
    
        // Ready
        player.addListener('ready', (device_id: string) => {
            console.log('Ready with Device ID', device_id);
        });
    
        // Not Ready
        player.addListener('not_ready', (device_id: string) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        player.addListener('initialization_error', (message: string) => {
            console.error(message);
        });
    
        player.addListener('authentication_error', (message: string) => {
            console.error(message);
        });
    
        player.addListener('account_error', (message: string) => {
            console.error(message);
        });
    
        player.connect();
    }
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

  // async redirectToAuthCodeFlow(clientId: string) {
  //   const verifier = this.generateCodeVerifier(128);
  //   const challenge = this.generateCodeChallenge(verifier);

  //   localStorage.setItem('verifier', verifier);

  //   const params = new URLSearchParams();
  //   params.append('client_id', clientId);
  //   params.append('response_type', 'code');
  //   params.append('redirect_uri', 'http://localhost:4200/callback/');
  //   params.append('scope', 'user-read-private user-read-email');
  //   params.append('code_challenge_method', 'S256');
  //   params.append('code_challenge', await challenge);

  //   document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
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
  //   this.homeService.accessToken$ = access_token;
  // }

  // generateCodeVerifier(length: number) {
  //   let text = '';
  //   let possible =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  //   for (let i = 0; i < length; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // }

  // async generateCodeChallenge(codeVerifier: string) {
  //   const data = new TextEncoder().encode(codeVerifier);
  //   const digest = await window.crypto.subtle.digest('SHA-256', data);
  //   return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=+$/, '');
  // }
}
