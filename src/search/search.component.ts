import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  artists: string[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.artists = this.searchService.getArtists();
  }
}
