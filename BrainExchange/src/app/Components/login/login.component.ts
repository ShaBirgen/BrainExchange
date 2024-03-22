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
import { loginDetails } from '../../Interfaces/Userinterface';
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
      if (res.message) {
        this.success = true;
        this.successMsg = res.message;
        setTimeout(() => {
          this.success = true;
          this.router.navigate(['user']);
        }, 2000);
      } else if (res.error) {
        this.error = true;
        this.errorMsg = res.error;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    });
  }
}
