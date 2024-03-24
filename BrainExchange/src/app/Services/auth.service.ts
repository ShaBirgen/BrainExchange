import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails, registerUser } from '../Interfaces/Userinterface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(user_details: loginDetails) {
    return this.http.post<{ message: string; token: string; error: string }>(
      'http://localhost:3000/users/login',
      user_details
    );
  }
  readToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    };
    return this.http.post<{
      info: { user_id: string; Fname: string; email: string; role: string };
    }>('http://localhost:3000/users/checkdetails', {}, httpOptions);
  }

  registerUser(register_details: registerUser) {
    return this.http.post<{
      message: string;
      id: string;
      error: string;
      messageerror: string;
    }>('http://localhost:3000/users/register', register_details);
  }
}
