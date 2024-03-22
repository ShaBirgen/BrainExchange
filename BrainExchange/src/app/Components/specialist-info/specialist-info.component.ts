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
import Swal from 'sweetalert2';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Interfaces/categoryInterface';
@Component({
  selector: 'app-specialist-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent, RouterLink],
  templateUrl: './specialist-info.component.html',
  styleUrl: './specialist-info.component.css',
})
export class SpecialistInfoComponent {
  detailsForm!: FormGroup;
  user_id!: string;
  categoriesArr: Category[] = [];
  errorMsg!: string;
  successMsg!: string;
  success = false;
  error = false;

  getUserId() {
    this.route.params.subscribe((params) => {
      this.user_id = params['id'];
    });
  }

  constructor(
    private userservice: UserService,
    private categoryservice: CategoriesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getUserId();
    this.fetchCategories();

    this.detailsForm = this.fb.group({
      First_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Speciality: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Rate: ['', [Validators.required]],
    });
  }

  submitSpecialist() {
    console.log(this.detailsForm.value);
    
    if (this.detailsForm.valid) {
      this.userservice
        .setSpecialist(this.user_id, this.detailsForm.value)
        .subscribe((res) => {
          console.log(res);


          if (res.message) {
            this.success = true;
            this.successMsg = res.message;
            setTimeout(() => {
              this.success = false;
              this.sucess();
              this.router.navigate([`/specialist/${this.user_id}`]);
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

  fetchCategories() {
    this.categoryservice.getAllCategories().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.Categories) {
        console.log(res.Categories);
        this.categoriesArr = res.Categories;
      }
    });
  }

  sucess() {
    Swal.fire({
      title: 'Success!',
      text: 'You details have been submitted successfully.',
      icon: 'success',
    });
  }
}
