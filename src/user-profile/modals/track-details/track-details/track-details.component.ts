import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';

import { Track } from '../../../../shared/classes/track';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.css'
})
export class TrackDetailsComponent implements OnInit {
  @Input() inTrackDetail = new Track;
  @Output() outModalState = new EventEmitter<number>();
  @Output() outModalVisible = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log(this.inTrackDetail);
  }

  closeModal(): void {
    this.outModalState.emit(0);
    this.outModalVisible.emit(false);
  }
}
