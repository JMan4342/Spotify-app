import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getCurrentUserProfile(access_token: string): Observable<any> {
    return this.http
      .get(
        'https://api.spotify.com/v1/me',
        {headers: {
          'Authorization': 'Bearer ' + access_token,
        }}
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getCurrentUserTopTracks(access_token: string): Observable<any> {
    return this.http
      .get(
        'https://api.spotify.com/v1/me/top/tracks?limit=5',
        {headers: {
          'Authorization': 'Bearer ' + access_token,
        }}
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
