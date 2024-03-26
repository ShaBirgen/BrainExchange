import { Component, Input, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { userResponse } from '../../Interfaces/Userinterface';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ReviewsService } from '../../Services/reviews.service';
import { reviewResponse } from '../../Interfaces/review.interface';

@Component({
  selector: 'app-user-specialist-view',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule, StarRatingComponent, RouterLink ],
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
  reviewArr: reviewResponse[]= []
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private reviewservice: ReviewsService,
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
      localStorage.setItem('user_id', this.user_id);
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
          Swal.fire('Success', 'Your appointment has been booked', 'success');
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
    const { value: Stars } = await Swal.fire({
      title: 'Leave a Review',
      html: `
        <div>
          <p>Rating: ${this.rating}/5</p>
        </div>`,
      focusConfirm: false,
      preConfirm: () => {
        if (this.rating === 0) {
          Swal.fire({
            title: 'Error',
            text: 'Please select a star.',
            icon: 'error',
          });
          return null;
        } else {
          return { value: this.rating };
        }
      },
      confirmButtonColor: '#28a745',
    });

    if (Stars && Stars.value) {
      const { value: Review } = await Swal.fire({
        title: 'Write your review here',
        input: 'textarea',
        inputPlaceholder: 'Write your review here...',
        inputAttributes: {
          'aria-label': 'Write your review here',
        },
      });

      if (Review) {
        // Submit review to backend server
        const response = await fetch(
          `http://localhost:3000/reviews/createReview/${this.user_id}/${this.Specialists_id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Stars: Stars.value, Review }),
          }
        );

        if (response.ok) {
          // Show success message
          Swal.fire({
            title: 'Review submitted!',
            html: `Rating: ${Stars.value}<br>Review: ${Review}`,
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

  setRating(value: number) {
    if (!this.readonly) {
      this.rating = value;
      console.log(this.rating);
    }
  }
  getOneUserDetails() {
    this.userservice
      .getSpecialistDetails(this.Specialists_id)
      .subscribe((res) => {
        console.log(res, this.Specialists_id);
        this.user.Description = res.user[0].Description;
        this.user.First_Name = res.user[0].First_Name;
        this.user.Last_Name = res.user[0].Last_Name;
        this.user.categoryname = res.user[0].categoryname;
        this.user.Profile_Image = res.user[0].Profile_Image;
        this.user.Speciality = res.user[0].Speciality;
        this.user.Rate = res.user[0].Rate;
        this.user.created_at = res.user[0].created_at;
        this.user.Username = res.user[0].Username;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


  }

