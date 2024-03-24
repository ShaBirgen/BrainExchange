import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Specialists } from '../../Interfaces/categoryInterface';
import { CategoriesService } from '../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  input1: any;
  input2: any;
  input3: any;
  input4: any;
  Specialists_id!: string;
  user_id!: string;
  specialistsArr: Specialists[] = [];
  id!: string;
  error = false;
  constructor(
    private route: ActivatedRoute,
    private categoriesservice: CategoriesService,
    private authservice: AuthService
  ) {
    this.getId();
    this.getUserId();
  }
  getId() {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.Specialists_id = params['user_id'];
    });
    console.log(this.user_id);

    const token: string = localStorage.getItem('token') as string;
    this.authservice.readToken(token).subscribe((res) => {
      console.log(res);

      this.user_id = res.info.user_id;
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

  getUserId() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchSpecialists();
  }

  fetchSpecialists() {
    this.categoriesservice.specialistByCategoryId(this.id).subscribe((res) => {
      console.log(res);
      if (res.error) {
        console.log(res.error);
      } else if (res.Specialists) {
        console.log(res.Specialists);
        this.specialistsArr = res.Specialists;
      }
    });
  }
}
