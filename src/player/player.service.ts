import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Track } from '../shared/classes/track';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  track = signal<Track | undefined>(undefined);

  getDevices(access_token: string): Observable<any> {
    // const baseHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + access_token);
    // let authorization = '';
    // authorization = 'Authorization: Bearer ' + access_token;
    // this.headers: {"Authorization": "Bearer " + access_token};
    return this.http
      .get('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      })
      .pipe(
        map((results) => {
          return results;
        })
      );
  }

  updateTrack(updatedTrack: Track) {
    this.track.set(updatedTrack);
    console.log(this.track);
  }
}
