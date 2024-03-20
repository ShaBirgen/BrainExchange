import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { specialist, updateUser, userResponse, usersResponse } from '../../Interfaces/Userinterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<usersResponse>(
      'http://localhost:3000/users/getAllUsers'
    );
  }
  deleteUser(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3000/users/deleteUser/${id}`
    );
  }

  getOneUserDetails(id: string) {
    return this.http.get<{ user: userResponse[]; error: { error: string } }>(
      `http://localhost:3000/users/getOneUser/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  updateUserDetails(user_Id: string, details: updateUser) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3000/users/updateUser/${user_Id}`,
      details,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  setRole(user_Id: string, Role: string) {
    return this.http.put<{ success: string }>(
      `http://localhost:3000/users/set-role/${user_Id}`,
      { Role }
    );
  }

  setSpecialist(user_Id:string, set_specialist: specialist){
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3000/users/specialist/${user_Id}`,
      set_specialist,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
}
}