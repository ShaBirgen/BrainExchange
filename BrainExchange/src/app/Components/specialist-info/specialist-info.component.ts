import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-specialist-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './specialist-info.component.html',
  styleUrl: './specialist-info.component.css',
})
export class SpecialistInfoComponent {
  detailsForm!: FormGroup;
  user_id!: string;
  errorDiv = false;
  successDiv = false;
  errorMsg!: string;
  successMsg!: string;


  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.detailsForm = this.fb.group({
      gender: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      about: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      bankAcNo: ['', [Validators.required, Validators.min(0)]],
      bankAcName: ['', [Validators.required]]
    });
  }

}