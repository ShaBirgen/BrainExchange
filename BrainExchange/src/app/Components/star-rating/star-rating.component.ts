import { Component } from '@angular/core';
import {EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(value);
  }
}
