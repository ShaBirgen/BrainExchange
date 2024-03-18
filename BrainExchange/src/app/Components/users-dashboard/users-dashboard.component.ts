import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { Category } from '../../../Interfaces/categoryInterface';
import { CategoriesService } from '../../../Services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [DashboardComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css'
})
export class UsersDashboardComponent {

  categoriesArr:Category[]=[];

  constructor(private categoriesservice: CategoriesService){
    this.fetchcategories();
  }
  fetchcategories() {
    this.categoriesservice.getAllCategories().subscribe((res)=>{
      res.Categories.forEach((category)=>{this.categoriesArr.push(category)})
      if(res.error){
        console.log(res.error);
      }else if(res.Categories){
        console.log(res.Categories);
        
      }
    })
  }
}
