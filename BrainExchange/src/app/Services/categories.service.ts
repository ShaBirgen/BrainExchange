import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Specialists, categoriesResponse } from '../Interfaces/categoryInterface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  createCategory(category: Category) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3000/category/createCategory',
      category
    );
  }

  getAllCategories() {
    return this.http.get<categoriesResponse>(
      'http://localhost:3000/category/getAllCategories'
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3000/category/deleteCategory/${id}`
    );
  }

  getOneCategoryDetails(id: string) {
    return this.http.get<{ category: Category[] }>(
      `http://localhost:3000/category/getOnecategory/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
  updateCategoryDetails(id: string, details: Category) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3000/category/updateCategory/${id}`,
      details,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  specialistByCategoryId(id:string){
    return this.http.get<{
      error: any; Specialists: Specialists[] 
}>(
      `http://localhost:3000/category/categorySpecialists/${id}`,
    )
  }
}
