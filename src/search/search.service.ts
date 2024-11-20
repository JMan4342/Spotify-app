import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  getArtists() {
    let artists = [];

    artists = ['Green Day', 'Smashing Pumpkins', 'Rancid', 'Linda Lindas'];

    return artists;
  }
}
