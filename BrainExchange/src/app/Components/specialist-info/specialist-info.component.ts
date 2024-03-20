import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../../Services/user.service';
import { specialist } from '../../../Interfaces/Userinterface';

@Component({
  selector: 'app-specialist-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent, RouterLink],
  templateUrl: './specialist-info.component.html',
  styleUrl: './specialist-info.component.css',
})
export class SpecialistInfoComponent {
  detailsForm!: FormGroup;
  user_Id!: string;
  errorDiv = false;
  successDiv = false;
  errorMsg!: string;
  successMsg!: string;
  success = false;
  error = false;
  // userId!: string;

  getUserId() {
    this.route.params.subscribe((params) => {
      this.user_Id = params['id'];
    });
  }

  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getUserId();

    this.detailsForm = this.fb.group({
      First_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Speciality: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Rate: ['', [Validators.required]],
    });
  }

  submitSpecialist() {
    if (this.detailsForm.valid) {
      this.userservice
        .setSpecialist(this.user_Id, this.detailsForm.value)
        .subscribe((res) => {
          console.log(res);

          if (res.message) {
            this.success = true;
            this.successMsg = res.message;
          }
        });
    }
  }

  // onSubmit() {
  //   if (this.detailsForm.valid) {
  //     const user_id = 'userserv'; // Get the user_id from wherever you store it
  //     const specialistData: specialist = this.detailsForm.value;
  //     this.userservice.setSpecialist(user_id, specialistData).subscribe(
  //       (response) => {
  //         // Handle success response
  //         this.successMsg = response.message;
  //         this.successDiv = true;
  //         // Optionally, reset the form after successful submission
  //         this.detailsForm.reset();
  //       },
  //       (error) => {
  //         // Handle error response
  //         this.errorMsg = error.error;
  //         this.errorDiv = true;
  //       }
  //     );
  //   }
  // }
}
