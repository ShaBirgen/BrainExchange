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
import { registerUser } from '../../Interfaces/Userinterface';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DashboardComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  error = false;
  success = false;

  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Phone_number: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register(details: registerUser) {
    console.log(details.Password);

    this.authservice.registerUser(this.registerForm.value).subscribe((res) => {
      console.log(res);
      if (res) {
        this.success = true;
        this.sucess();
        setTimeout(() => {
          this.success = false;
          this.router.navigate([`role/${res.id}`]);
        }, 2000);
      } else if (res) {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    });
  }
  sucess() {
    Swal.fire({
      title: 'Success!',
      text: 'You are registered successfully!',
      icon: 'success',
    });
  }
}
