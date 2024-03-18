import { Component } from '@angular/core';
import { CategoriesService } from '../../../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
      this.isPopupOpen = false;
    });
  }

  isPopupOpen: boolean = false;

  openPopup() {
    this.isPopupOpen = true;
  }
}
