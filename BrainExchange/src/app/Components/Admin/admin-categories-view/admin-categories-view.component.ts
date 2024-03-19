import { Component } from '@angular/core';
import { CategoriesService } from '../../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-categories-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-categories-view.component.html',
  styleUrl: './admin-categories-view.component.css',
})
export class AdminCategoriesViewComponent {
  categoriesArr: any[] = [];
  constructor(private categories: CategoriesService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categories.getAllCategories().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.Categories) {
        console.log(res.Categories);
        this.categoriesArr = res.Categories;
      }
    });

    console.log(this.categories);
  }

  deleteCategory(id: string) {
    this.categories.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.fetchCategories();
    });
  }

  remove(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory(id); // Call the deleteUser method if the user confirms
        Swal.fire({
          title: 'Deleted!',
          text: 'Your user has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
