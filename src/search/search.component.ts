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
        
      },
      error: err => console.log(err),
    });
  }
}
