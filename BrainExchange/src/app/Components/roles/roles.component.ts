import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  constructor(private router: Router){}
  user(){
    
    this.router.navigate(['/user'])
    console.log("This is a user");
  }

  special(){
    this.router.navigate(['/More-info'])
    console.log("This is a specialist");
    
  }
}
