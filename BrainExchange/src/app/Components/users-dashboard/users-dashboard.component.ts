import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../Interfaces/categoryInterface';
import { CategoriesService } from '../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipe/search.pipe';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
  imports: [
    DashboardComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
  ],
})
export class UsersDashboardComponent {
  categoriesArr: Category[] = [];
  id!: string;
  filteredCategories: Category[] = [];
  searchQuery!: string;
  user_id!: string;

  constructor(
    private userservice: UserService,
    private authservice: AuthService,
    private categoriesservice: CategoriesService,
    private router: Router
  ) {
    this.fetchcategories();
    this.fetchUsers();


       const token: string = localStorage.getItem('token') as string;
       this.authservice.readToken(token).subscribe((res) => {
         console.log(res);

         this.user_id = res.info.user_id;
         localStorage.setItem('user_id', this.user_id);
       });
  }
  fetchcategories() {
    this.categoriesservice.getAllCategories().subscribe((res) => {
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

  fetchUsers() {
    this.userservice.getOneUserDetails(this.user_id).subscribe((res) => {
      res.user.forEach((user) => {
        this.user_id = user.user_id;
      });
    });
  }

  

navigateToUser() {
  if (this.user_id) {
    this.router.navigate(['/user-profile', this.user_id]);
  } else {
    console.error('User ID is undefined');
    
  }
}

  navigateToCategory(category_id: string) {
    this.id = category_id;
    this.router.navigate(['/Categories', category_id]);
  }

  searchCategories(query: string) {
    const searchPipe = new SearchPipe();

    this.filteredCategories = searchPipe.transform(this.categoriesArr, query);
  }
}
