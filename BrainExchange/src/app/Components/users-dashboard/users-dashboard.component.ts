import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [DashboardComponent, FooterComponent, RouterLink],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css'
})
export class UsersDashboardComponent {

}
