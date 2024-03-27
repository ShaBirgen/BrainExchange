import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { updateUser } from '../../../Interfaces/Userinterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  updateUserForm!: FormGroup;
  id!: string;
  user!: updateUser;
  successMsg!: string;
  errorMsg!: string;
  visible = false;
  visible2 = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.updateUserForm = this.fb.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Phone_number: ['', [Validators.email, Validators.required]],
      Password: ['', [Validators.required]],
    });
    this.getUserId();
  }

  getUserId() {
    this.route.params.subscribe((params) => {
      console.log(params['user_id']);
      this.id = params['user_id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userService.getOneUserDetails(this.id).subscribe((response) => {
      console.log(response.user[0]);

      this.user = response.user[0];

      this.updateUserForm.patchValue({
        Username: this.user.Username,
        Email: this.user.Email,
        Phone_number: this.user.Phone_number,
        // Password: this.user.Password
      });
    });
  }
  updateUser() {
    this.userService
      .updateUserDetails(this.id, this.updateUserForm.value)
      .subscribe((response) => {
        if (response.message) {
          this.visible2 = true;
          this.successMsg = response.message;

          setTimeout(() => {
            this.visible2 = false;
          }, 3000);
        }
      });
  }
}
