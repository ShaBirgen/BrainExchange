import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
}
