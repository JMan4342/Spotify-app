import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { forkJoin } from 'rxjs';

import { UserProfileService } from './user-profile.service';
import { HomeService } from '../home/home.service';

import { UserProfile } from '../shared/classes/user-profile';
import { Track } from '../shared/classes/track';
import { LoginService } from '../login/login.service';
import { Artist } from '../shared/classes/artist';
import { TrackDetailsComponent } from './modals/track-details/track-details/track-details.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    DialogModule,
    TrackDetailsComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnChanges {
  outTrackDetail: Track = new Track();

  modalVisible: boolean = false;
  modalShown: number = 0;
  access_token: string = '';
  userProfile: UserProfile = new UserProfile();
  userTopTracks: Track[] = [];
  tempTrack: Track = new Track();
  userTopArtists: Artist[] = [];
  tempArtist: Artist = new Artist();

  constructor(
    private userProfileService: UserProfileService,
    private homeService: HomeService,
    private loginService: LoginService
  ) {
    this.access_token = this.loginService.accessToken$;
  }
  ngOnChanges(): void {
    
  }

  ngOnInit() {
    const spotifyUserProfile = this.userProfileService.getCurrentUserProfile(
      this.access_token
    );
    const spotifyUserTopTracks =
      this.userProfileService.getCurrentUserTopTracks(this.access_token);
    const spotifyUserTopArtists =
      this.userProfileService.getCurrentUserTopArtist(this.access_token);

    forkJoin([
      spotifyUserProfile,
      spotifyUserTopTracks,
      spotifyUserTopArtists,
    ]).subscribe({
      next: (results) => {
        console.log(results);
        this.userProfile.DisplayName = results[0].display_name;
        this.userProfile.Id = results[0].id;
        this.userProfile.ImageUrl = results[0].images[0].url;

        for (const i of results[1].items) {
          let tempTrack = new Track();
          tempTrack.Album = i.album.name;
          tempTrack.AlbumId = i.album.id;
          let tempImages = i.album.images.sort(
            (a: { height: number }, b: { height: number }) =>
              a.height - b.height
          );
          tempTrack.AlbumImage = tempImages[0].url;
          tempTrack.ArtistName = i.artists[0].name;
          tempTrack.ArtistId = i.artists[0].id;
          tempTrack.TrackName = i.name;
          tempTrack.TrackId = i.id;
          this.userTopTracks.push(tempTrack);
        }

        for (const i of results[2].items) {
          let tempArtist = new Artist();
          tempArtist.ArtistName = i.name;
          tempArtist.ArtistId = i.id;
          tempArtist.Genres = i.genres;
          let tempImages = i.images.sort(
            (a: { height: number }, b: { height: number }) =>
              a.height - b.height
          );
          tempArtist.Image = tempImages[0].url;
          this.userTopArtists.push(tempArtist);
        }
      },
      error: (err) => console.log(err),
    });

    // this.userProfileService.getCurrentUserProfile(this.access_token).subscribe({
    //   next: result => {
    //     console.log(result);
    //     this.userProfile.DisplayName = result.display_name;
    //     this.userProfile.Id = result.id;
    //     this.userProfile.ImageUrl = result.images[0].url;
    //     console.log(this.userProfile);
    //   },
    //   error: err => console.log(err),
    // });
  }
  
  onRowSelect(modal: number, event: any): void {
    console.log(event);
    this.modalVisible = true;
    this.modalShown = modal;

    if (modal == 1) {
      this.outTrackDetail = new Track();
      this.outTrackDetail = event.data;
      // this.outTrackDetail.emit(tempTrackDetail);
    };
  }
}
