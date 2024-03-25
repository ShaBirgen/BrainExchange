import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  error = false;
  success = false;

  successMsg!: String;
  errorMsg!: String;

  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.authservice.loginUser(this.loginForm.value).subscribe((res) => {
      console.log(res);
      this.saveToken(res.token);
      if (res.message) {
        this.authservice.readToken(res.token).subscribe((response) => {
          console.log(response);

          if (response.info.Role === 'specialist') {
            this.success = true;
            setTimeout(() => {
              this.success = true;
              this.sucess();
              this.router.navigate([`specialist/${response.info.user_id}`]);
            }, 2000);
          } else if (response.info.Role) {
            this.success = true;
            this.sucess();
            setTimeout(() => {
              this.success = true;
              this.router.navigate(['user']);
            }, 2000);
          }
        });
      } else if (res.error) {
        this.error = true;
        this.errorMsg = res.error;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    });
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  sucess() {
    Swal.fire({
      title: 'Success!',
      text: 'Login successful',
      icon: 'success',
    });
  }
}