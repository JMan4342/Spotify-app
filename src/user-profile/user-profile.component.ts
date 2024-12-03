import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { forkJoin } from 'rxjs';

import { UserProfileService } from './user-profile.service';
import { HomeService } from '../home/home.service';

import { UserProfile } from '../shared/classes/user-profile';
import { Track } from '../shared/classes/track';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CardModule, TableModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  access_token: string = '';
  userProfile: UserProfile = new UserProfile();
  userTopTracks: Track[] = [];
  tempTrack: Track = new Track();

  constructor(private userProfileService: UserProfileService, private homeService: HomeService, private loginService: LoginService) {
    this.access_token = this.loginService.accessToken$;
  }

  ngOnInit() {
    const spotifyUserProfile = this.userProfileService.getCurrentUserProfile(this.access_token);
    const spotifyUserTopTracks = this.userProfileService.getCurrentUserTopTracks(this.access_token);

    forkJoin([spotifyUserProfile, spotifyUserTopTracks]).subscribe({
        next: results => {
          console.log(results);
          this.userProfile.DisplayName = results[0].display_name;
          this.userProfile.Id = results[0].id;
          this.userProfile.ImageUrl = results[0].images[0].url;
          console.log(this.userProfile);

          for (const i of results[1].items) {
            let tempTrack = new Track();
            tempTrack.Album = i.album.name;
            tempTrack.AlbumId = i.album.id;
            let tempImages = i.album.images.sort((a: { height: number; }, b: { height: number; }) => a.height - b.height);
            tempTrack.AlbumImage = tempImages[0].url;
            tempTrack.ArtistName = i.artists[0].name;
            tempTrack.ArtistId = i.artists[0].id;
            tempTrack.TrackName = i.name;
            tempTrack.TrackId = i.id;
            this.userTopTracks.push(tempTrack);
            console.log(this.userTopTracks);
          };
        },
        error: err => console.log(err),
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

}
