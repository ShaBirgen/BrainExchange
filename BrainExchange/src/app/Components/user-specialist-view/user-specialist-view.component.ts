import { Component, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { userResponse } from '../../Interfaces/Userinterface';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-specialist-view',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './user-specialist-view.component.html',
  styleUrl: './user-specialist-view.component.css',
})
export class UserSpecialistViewComponent {
  input1: any;
  input2: any;
  input3: any;
  input4: any;
  Specialists_id!: string;
  user_id!: string;
  user: userResponse = {} as userResponse;

  constructor(
    private route: ActivatedRoute,
    private authservice: AuthService,
    private userservice: UserService
  ) {
    this.getId();
    this.getUserId();
  }
  getId() {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.Specialists_id = params['user_id'];
      console.log(this.Specialists_id);
    });

    const token: string = localStorage.getItem('token') as string;
    this.authservice.readToken(token).subscribe((res) => {
      console.log(res);

      this.user_id = res.info.user_id;
    });
  }

  getUserId() {
    this.route.params.subscribe((params) => {
      this.user_id = params['id'];
      this.getOneUserDetails();
    });
  }

  async multipleInputs() {
    const { value: formValues } = await Swal.fire({
      title: 'Book Appointment',
      html: `
      <label for="swal-input1">Description</label><br>
<textarea id="swal-input1" class="swal2-textarea" style="height: 30vh; width: 50vw;"></textarea><br>


      <label for="swal-input2">Deadline</label>
      <input id="swal-input2" class="swal2-input" type="date" style="width:50vw;" > <br>

      <label for="swal-input3">Duration</label>
      <input id="swal-input3" class="swal2-input" placeholder="In days" style="width:50vw;"> <br>

      <label for="swal-input4">Salary</label> <br>
      <input id="swal-input4" class="swal2-input" style="width:50vw;"> 
    `,
      width: '65vw',
      focusConfirm: false,
      preConfirm: () => {
        const input1Value =
          (document.getElementById('swal-input1') as HTMLInputElement)?.value ??
          '';
        const input2Value =
          (document.getElementById('swal-input2') as HTMLInputElement)?.value ??
          '';
        const input3Value =
          (document.getElementById('swal-input3') as HTMLInputElement)?.value ??
          '';
        const input4Value =
          (document.getElementById('swal-input4') as HTMLInputElement)?.value ??
          '';

        return [input1Value, input2Value, input3Value, input4Value];
      },
    });

    if (formValues) {
      // Send form data to backend
      try {
        const response = await fetch(
          `http://localhost:3000/gigs/createGig/${this.user_id}/${this.Specialists_id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Description: formValues[0],
              Deadline: formValues[1],
              Duration: formValues[2],
              Salary: formValues[3],
            }),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log('Form data saved successfully:', responseData);
          Swal.fire('Success', 'Form data saved successfully', 'success');
        } else {
          console.error('Failed to save form data');
          Swal.fire('Error', 'Failed to save form data', 'error');
        }
      } catch (error) {
        console.error('Error saving form data:', error);
        Swal.fire('Error', 'An error occurred while saving form data', 'error');
      }
    }
  }

  async leaveReview() {
    // First step: Rating input
    const { value: Stars } = await Swal.fire({
      title: 'Leave a Review',
      html: `
      <div>
        <p>Rate your experience:</p>
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div>
    `,
      focusConfirm: false,
      confirmButtonColor: '#28a745',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      cancelButtonText: 'Cancel',
    });

    // If rating step is completed
    if (Stars) {
      const stars = document.querySelectorAll('.swal2-content .star');
      let selectedStarsValue = 0; // Initialize selectedStarsValue

      // Attach event listeners to stars
      stars.forEach((star) => {
        star.addEventListener('click', () => {
          const value = parseInt(star.getAttribute('data-value') || '0');
          selectedStarsValue = value; // Update selectedStarsValue on star click
          stars.forEach((s, index) => {
            s.classList.toggle('selected', index < value);
          });
        });
      });

      // Second step: Review input
      const { value: Review } = await Swal.fire({
        title: 'Write your review here',
        input: 'textarea',
        inputPlaceholder: 'Write your review here...',
        inputAttributes: {
          'aria-label': 'Write your review here',
        },
      });

      // If review step is completed
      if (Review) {
        // Submit review to backend server
        const response = await fetch(
          `http://localhost:3000/reviews/createReview/${this.user_id}/${this.Specialists_id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Stars: selectedStarsValue, Review }),
          }
        );

        if (response.ok) {
          // Show success message
          Swal.fire({
            title: 'Review submitted!',
            html: `Rating: ${selectedStarsValue}<br>Review: ${Review}`,
            icon: 'success',
          });
        } else {
          // Show error message
          Swal.fire({
            title: 'Error',
            text: 'Failed to submit review. Please try again later.',
            icon: 'error',
          });
        }
      }
    }
  }

  getOneUserDetails() {
    this.userservice.getOneUserDetails(this.Specialists_id).subscribe((res) => {
      console.log(res, this.Specialists_id);
      this.user.Description = res.user[0].Description;
      this.user.First_Name = res.user[0].First_Name;
      this.user.Last_Name = res.user[0].Last_Name;
      this.user.Speciality = res.user[0].Speciality;
      this.user.Rate = res.user[0].Rate;
      this.user.created_at = res.user[0].created_at;
      this.user.Username = res.user[0].Username;
    });
  }
}
