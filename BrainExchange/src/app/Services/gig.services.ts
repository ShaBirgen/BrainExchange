import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ordersResponse } from '../Interfaces/gig.interface';

@Injectable({
  providedIn: 'root',
})
export class GigService {
  constructor(private http: HttpClient) {}

  specialistGigs(Specialists_id: string) {
    return this.http.get<ordersResponse>(
      `http://localhost:3000/gigs/gigSpecialists/${Specialists_id}`
    );
  }
}
