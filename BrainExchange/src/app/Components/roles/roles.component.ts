import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  roleForm!: FormGroup;

  constructor(private userservice: UserService, private router: Router) {}
  user() {
    // this.userservice.setRole().subscribe((res) => {});
    this.router.navigate(['/user']);
    console.log('This is a user');
  }

  special() {
    this.router.navigate(['/More-info']);
    console.log('This is a specialist');
  }
}
