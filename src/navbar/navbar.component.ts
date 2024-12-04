import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(private authorizationService: AuthorizationService) {}

  vm$: Observable<any> = combineLatest([
    this.authorizationService.loginAuth$    
  ]).pipe(
    map(([loginAuth]) => {
      return loginAuth
    })
  );

}
