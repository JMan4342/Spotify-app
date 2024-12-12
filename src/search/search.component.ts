import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';

import { SearchService } from './search.service';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';
import { Album } from '../shared/classes/album';
import { Track } from '../shared/classes/track';
import { Artist } from '../shared/classes/artist';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  artists: string[] = [];
  access_token: string = '';
  searchTerm: string = '';
  albumSearchResults: Album[] = [];
  artistSearchResults: Artist[] = [];
  trackSearchResults: Track[] = [];

  constructor(
    private searchService: SearchService,
    private homeService: HomeService,
    private loginService: LoginService
  ) {
    this.access_token = this.loginService.accessToken$;
  }

  ngOnInit() {
    // this.artists = this.searchService.getArtists();
    // this.searchService.searchArtist(this.access_token).subscribe({
    //   next: (result) => console.log(result),
    //   error: (err) => console.log(err),
    // });
  }

  searchSpotify() {
    this.searchService.searchSpotify(this.access_token, this.searchTerm).subscribe({
      next: results => {
        console.log(results);
        this.createAlbumSearchResults(results.albums.items);
        this.createArtistSearchResults(results.artists.items);
        this.createTrackSearchResults(results.tracks.items);
      },
      error: err => console.log(err),
    });
  }

  createAlbumSearchResults(albums: any[]): void {
    for (const a of albums) {
      let tempAlbum = new Album();
      tempAlbum.AlbumName = a.name;
      tempAlbum.AlbumId = a.id;
      tempAlbum.ArtistName = a.artists[0].name;
      tempAlbum.ArtistId = a.artists[0].id;
      tempAlbum.Image = a.images[0].url;
      tempAlbum.ReleaseDate = a.release_date;
      this.albumSearchResults.push(tempAlbum);
    };
    console.log('Albums', this.albumSearchResults);
  }

  createArtistSearchResults(artists: any[]): void {
    for (const a of artists) {
      let tempArtist = new Artist();
      tempArtist.ArtistName = a.name;
      tempArtist.ArtistId = a.id;
      tempArtist.Genres = a.genres;
      tempArtist.Image = a.images[0].url;
      this.artistSearchResults.push(tempArtist);
    };
    console.log('Artist', this.artistSearchResults);
  }

  createTrackSearchResults(tracks: any[]): void {
    for (const t of tracks) {
      let tempTrack = new Track();
      tempTrack.Album = t.album.name;
      tempTrack.AlbumImage = t.album.images[0].url;
      tempTrack.AlbumId = t.album.id;
      tempTrack.ArtistName = t.artists[0].name;
      tempTrack.ArtistId = t.artists[0].id;
      tempTrack.TrackName = t.name;
      tempTrack.TrackId = t.id;
      this.trackSearchResults.push(tempTrack);
    };
    console.log('Tracks', this.trackSearchResults);
  }
}
