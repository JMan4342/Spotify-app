import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getDevices(access_token: string): Observable<any> {
      // const baseHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + access_token);
      // let authorization = '';
      // authorization = 'Authorization: Bearer ' + access_token;
      // this.headers: {"Authorization": "Bearer " + access_token};
      return this.http
        .get(
          'https://api.spotify.com/v1/me/player/devices',
          {headers: {
            'Authorization': 'Bearer ' + access_token,
          }}
        )
        .pipe(
          map((results) => {
            return results;
          })
        );
    }
}
