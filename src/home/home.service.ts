import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  accessToken$: string = '';

  constructor() { }
}
