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
      if (res.message) {
        this.success = true;
        this.successMsg = res.message;
        setTimeout(() => {
          this.success = false;
          this.router.navigate(['login']);
        }, 2000);
      } else if (res.messageerror) {
        this.error = true;
        this.errorMsg = res.messageerror;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    });
  }
}
