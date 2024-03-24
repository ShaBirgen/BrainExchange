import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { userResponse } from '../../Interfaces/Userinterface';
import { GigService } from '../../Services/gig.services';
import { ordersResponse } from '../../Interfaces/gig.interface';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css',
})
export class SpecialistDashboardComponent {
  user_id!: string;
  Specialists_id!: string;
  user: userResponse = {} as userResponse;
  ordersArr: ordersResponse[] = [];

  getUserId() {
    this.route.params.subscribe((params) => {
      this.user_id = params['id'];
    });
    this.getOneUserDetails();
  }

  constructor(
    private router: Router,
    private userservice: UserService,
    private gigservice: GigService,
    private route: ActivatedRoute
  ) {
    this.getUserId();
    this.fetchOrders();
  }

  getOneUserDetails() {
    this.userservice.getOneUserDetails(this.user_id).subscribe((res) => {
      console.log(res);
      this.user.Email = res.user[0].Email;
      this.user.Phone_number = res.user[0].Phone_number;
      this.user.Username = res.user[0].Username;
      this.user.Role = res.user[0].Role;
      this.user.Speciality = res.user[0].Speciality;
      this.user.Description = res.user[0].Description;
      this.user.First_Name = res.user[0].First_Name;
      this.user.Last_Name = res.user[0].Last_Name;
      this.user.created_at = res.user[0].created_at;
      this.user.Phone_number = res.user[0].Phone_number;
      this.user.Rate = res.user[0].Rate;
    });
  }

  fetchOrders() {
    this.gigservice.specialistGigs(this.Specialists_id).subscribe(
      (res) => {
        console.log(res);
        if (res.error) {
          console.error(res.error);
        } else if (res.gigs && res.gigs.length > 0) {
          console.log(res.gigs);
          this.ordersArr = res.gigs;
        } else {
          console.warn('No gigs found for the specialist');
        }
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
