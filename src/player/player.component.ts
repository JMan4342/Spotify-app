import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { LoginService } from '../login/login.service';

declare var Spotify:any;

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  access_token: string = '';

  track = this.playerService.track;

  constructor(
    private playerService: PlayerService,
    private loginService: LoginService
  ) {
    this.access_token = this.loginService.accessToken$;
    // this.initializePlayer();
  }

  ngOnInit() {
    this.initializePlayer();

    this.getAvailableDevices();
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
        getOAuthToken: (cb: any) => {
          cb(token);
        },
        volume: 0.5,
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

      this.getAvailableDevices();
    };
  }

  getAvailableDevices() {
    this.playerService.getDevices(this.access_token).subscribe({
      next: (results) => {
        console.log('Devices', results);
      },
      error: (err) => console.log(err),
    });
  }
}
