import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GigService {
  constructor(private http: HttpClient) {}

  specialistGigs(Specialists_id: string) {
    return this.http.get<{ error: any; gigs: any[] }>(
      `http://localhost:3000/gigs/gigSpecialists/${Specialists_id}`
    );
  }
}
