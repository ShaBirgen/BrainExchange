import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [DashboardComponent, FooterComponent],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css'
})
export class UsersDashboardComponent {

}
