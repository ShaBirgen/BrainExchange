import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FooterComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {

  userId!: string;

  getUserId(){
    this.route.params.subscribe((params) =>{
      this.userId = params['id']
    })
  }
  roleForm!: FormGroup;

  constructor(private userservice: UserService, private router: Router, private route: ActivatedRoute) {
    this.getUserId()
  }
  user() {
    this.userservice.setRole(this.userId, 'user').subscribe((res) => {
      if(res.success){
        this.router.navigate(['/user']);
      }
    });
    console.log('This is a user');
  }
  
  special() {
    this.userservice.setRole(this.userId, 'specialist').subscribe((res) => {});
    this.router.navigate(['/More-info']);
    console.log('This is a specialist');
  }
}
