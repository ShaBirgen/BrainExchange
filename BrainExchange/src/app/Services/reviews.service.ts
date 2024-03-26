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
   getOneReview(id:string){
    return this.http.get<{ Review: Review[] }>(
      ` http://localhost:3000/reviews/getOneReview/${id}`,
    );
  }

  deleteReview(id:string){
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3000/reviews/deleteReview/${id}`
    );
  }

  specialistReviews(id:string){
    return this.http.get<{ error: any; Reviews: Review[] }>(
      `http://localhost:3000/reviews/specialistReview/${id}`
    );
  }
}

 