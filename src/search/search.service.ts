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

  searchSpotify(access_token: string, searchTerm: string): Observable<any> {
    // const baseHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + access_token);
    // let authorization = '';
    // authorization = 'Authorization: Bearer ' + access_token;
    // this.headers: {"Authorization": "Bearer " + access_token};
    return this.http
      .get(
        'https://api.spotify.com/v1/search?q=' + searchTerm + '&type=album%2Cartist%2Ctrack',
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
