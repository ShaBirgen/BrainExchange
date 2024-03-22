import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CategoriesService } from '../../Services/categories.service';
import {
  Category,
  categoriesResponse,
} from '../../Interfaces/categoryInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [DashboardComponent, RouterLink, FooterComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  categoriesArr: Category[] = [];

  constructor(private categoriesservice: CategoriesService) {
    this.fetchcategories();
  }
  fetchcategories() {
    this.categoriesservice.getAllCategories().subscribe((res) => {
      // console.log(res);

      res.Categories.forEach((category) => {
        this.categoriesArr.push(category);
      });
      if (res.error) {
        console.log(res.error);
      } else if (res.Categories) {
        console.log(res.Categories);
      }
    });
  }
}
