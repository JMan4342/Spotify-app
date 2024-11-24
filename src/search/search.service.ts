import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getArtists() {
    let artists = [];

    artists = ['Green Day', 'Smashing Pumpkins', 'Rancid', 'Linda Lindas'];

    return artists;
  }

  searchArtist(access_token: string): Observable<any> {
    // const baseHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + access_token);
    let authorization = '';
    authorization = 'Authorization: Bearer ' + access_token;
    // this.headers: {"Authorization": "Bearer " + access_token};
    return this.http
      .get(
        'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album',
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
