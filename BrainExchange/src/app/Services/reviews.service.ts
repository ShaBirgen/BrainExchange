import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review, reviewResponse } from '../Interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) {}

  createReview(Review: Review) {
    return this.http.post<{ message: string; error: string }>(
      ' http://localhost:3000/reviews/createReview',
      Review
    )};
    
    getAllReviews() {
      return this.http.get<reviewResponse>(
        'http://localhost:3000/reviews/getAllReviews'
      );
    }
  }
