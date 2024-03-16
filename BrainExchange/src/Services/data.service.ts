import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  allIndustriesResponse,
  updateUserDetails,
} from '../Interfaces/data.Interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllIndustries() {
    return this.http.get<allIndustriesResponse>(
      'http://localhost:3900/industry/all'
    );
  }

  setRole(userId: string, role: string) {
    return this.http.put<{ success: string }>(
      `http://localhost:3900/users/set-role/${userId}`,
      role
    );
  }

  updateUser(userDetails: updateUserDetails, userId: string) {
    return this.http.put<{ success: string }>(
      `http://localhost:3900/users/update-details/${userId}`,
      userDetails
    );
  }
}
