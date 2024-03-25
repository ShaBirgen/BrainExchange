import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  oneUserResponse,
  specialist,
  updateUser,
  userResponse,
  usersResponse,
} from '../Interfaces/Userinterface';

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
    return this.http.get<oneUserResponse>(
      `http://localhost:3000/users/getOneUser/${id}`,
    );
  }

  getSpecialistDetails(id: string) {
    return this.http.get<oneUserResponse>(
      `http://localhost:3000/users/specialistInfo/${id}`
    );
  }
  updateUserDetails(user_Id: string, details: updateUser) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3000/users/updateUser/${user_Id}`,
      details,
    );
  }

  setRole(user_Id: string, Role: string) {
    return this.http.put<{ success: string }>(
      `http://localhost:3000/users/set-role/${user_Id}`,
      { Role }
    );
  }

  setSpecialist(user_Id: string, set_specialist: specialist) {
    return this.http.post<{
      messageerror: any;
      message: string;
      error: string;
    }>(`http://localhost:3000/users/specialist/${user_Id}`, set_specialist )
  }
}
