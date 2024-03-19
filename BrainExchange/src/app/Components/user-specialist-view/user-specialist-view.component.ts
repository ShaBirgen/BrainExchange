import { Component, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-user-specialist-view',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './user-specialist-view.component.html',
  styleUrl: './user-specialist-view.component.css',
})
export class UserSpecialistViewComponent {
  input1: any;
  input2: any;
  input3: any;
  input4: any;

  async multipleInputs() {
    const { value: formValues } = await Swal.fire({
      title: 'Book Appointment',
      html: `
        <label for="swal-input1"}>Description</label>
        <input #input1 id="swal-input1" class="swal2-input" style="width:50vw;" > <br>

         <label for="swal-input2">Deadline</label>
        <input #input2 id="swal-input2" class="swal2-input" type="date" style="width:50vw;" > <br>

         <label for="swal-input3">Duration</label>
        <input #input3 id="swal-input2" class="swal2-input" placeholder="In days" style="width:50vw;"> <br>

         <label for="swal-input4">Salary</label> <br>
        <input #input4 id="swal-input2" class="swal2-input" style="width:50vw;"> 
      `,
      width: '65vw',
      focusConfirm: false,
      preConfirm: () => {
        if (this.input1 && this.input2 && this.input3 && this.input4) {
          return [
            this.input1.nativeElement.value,
            this.input2.nativeElement.value,
            this.input3.nativeElement.value,
            this.input4.nativeElement.value,
          ];
        } else {
          return [null, null, null, null];
        }
      },
    });

    if (
      formValues &&
      formValues[0] !== null &&
      formValues[1] !== null &&
      formValues[2] !== null &&
      formValues[3] !== null
    ) {
      console.log(formValues);

      Swal.fire(JSON.stringify(formValues));
    }
    console.log('This is', formValues);
  }

  async leaveReview() {
    // First step: Rating input
    const { value: rating } = await Swal.fire({
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
      didOpen: () => {
        const stars = document.querySelectorAll('.swal2-content .star');
        stars.forEach((star) => {
          star.addEventListener('click', () => {
            stars.forEach((s) => s.classList.remove('active'));
            star.classList.add('active');
          });
        });
      },
      preConfirm: () => {
        return (
          document.querySelector('.swal2-content .star.active') as HTMLElement
        )?.getAttribute('data-value');
      },
    });

    // If rating step is completed
    if (rating) {
      // Second step: Review input
      const { value: review } = await Swal.fire({
        title: 'Write your review here',
        input: 'textarea',
        inputPlaceholder: 'Write your review here...',
        inputAttributes: {
          'aria-label': 'Write your review here',
        },
      });

      // If review step is completed
      if (review) {
        // Submit review
        Swal.fire({
          title: 'Review submitted!',
          html: `Rating: ${rating}<br>Review: ${review}`,
          icon: 'success',
        });
      }
    }
  }
}
