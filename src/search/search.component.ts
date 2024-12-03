import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchService } from './search.service';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  artists: string[] = [];
  access_token: string = '';

  constructor(private searchService: SearchService, private homeService: HomeService, private loginService: LoginService) {
    this.access_token = this.loginService.accessToken$;
  }

  ngOnInit() {
    this.artists = this.searchService.getArtists();
    this.searchService.searchArtist(this.access_token).subscribe({
      next: result => console.log(result),
      error: err => console.log(err),
    });
  }
}
