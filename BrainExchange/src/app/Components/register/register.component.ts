import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { registerUser } from '../../../Interfaces/Userinterface';
import { DashboardComponent } from '../dashboard/dashboard.component';

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

  successMsg!: String;
  errorMsg!: String;


    constructor(
      private authservice: AuthService,
      private fb: FormBuilder,
      private router: Router){
        this.registerForm = this.fb.group({
          Username: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          phone_number: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(8)]],
        });
      }
 
}
