import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from '../../../shared/classes/artist';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../../login/login.service';
import { UserProfileService } from '../../user-profile.service';
import { Track } from '../../../shared/classes/track';

@Component({
  selector: 'app-artist-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.css'
})
export class ArtistDetailsComponent implements OnInit {
  @Input() inArtistDetail = new Artist;
  @Output() outModalState = new EventEmitter<number>();
  @Output() outModalVisible = new EventEmitter<boolean>();

  access_token: string = '';

  constructor(
    private userProfileService: UserProfileService,
    private loginService: LoginService
  ) {
    this.access_token = this.loginService.accessToken$;
  }


  ngOnInit() {
    this.userProfileService.getArtistTopTracks(this.access_token, this.inArtistDetail.ArtistId).subscribe({
      next: result => {
        console.log(result.tracks);
        for (const t of result.tracks) {
          let tempTrack = new Track;
          tempTrack.TrackId = t.id;
          tempTrack.TrackName = t.name;
          this.inArtistDetail.TopTracks.push(tempTrack);
        };
        console.log(this.inArtistDetail);
      },
      error: err => console.log(err),
    });
  }

  closeModal(): void {
    this.outModalState.emit(0);
    this.outModalVisible.emit(false);
  }
}
