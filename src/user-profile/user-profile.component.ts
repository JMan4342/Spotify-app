import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { UserProfileService } from './user-profile.service';
import { HomeService } from '../home/home.service';

import { UserProfile } from '../shared/classes/user-profile';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  access_token: string = '';
  userProfile: UserProfile = new UserProfile();

  constructor(private userProfileService: UserProfileService, private homeService: HomeService) {
    this.access_token = this.homeService.accessToken$;
  }

  ngOnInit() {
    this.userProfileService.getCurrentUserProfile(this.access_token).subscribe({
      next: result => {
        console.log(result);
        this.userProfile.DisplayName = result.display_name;
        this.userProfile.Id = result.id;
        this.userProfile.ImageUrl = result.images[0].url;
        console.log(this.userProfile);
      },
      error: err => console.log(err),
    });
  }

}
