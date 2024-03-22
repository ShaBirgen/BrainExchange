import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Specialists } from '../../Interfaces/categoryInterface';
import { CategoriesService } from '../../Services/categories.service';
import { CommonModule } from '@angular/common';

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

  specialistsArr: Specialists[]= [];
  id!: string;
  error= false;

  getId(){
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.fetchSpecialists();
  }

  constructor(private categoriesservice: CategoriesService, private route: ActivatedRoute){
    this.getId()
  }

  fetchSpecialists(){
    this.categoriesservice.specialistByCategoryId(this.id).subscribe((res)=> {
      console.log(res);
      if(res.error){
        
        console.log(res.error);
      } else if (res.Specialists){
        console.log(res.Specialists);
        this.specialistsArr= res.Specialists
      }
    })
  }
  
}
