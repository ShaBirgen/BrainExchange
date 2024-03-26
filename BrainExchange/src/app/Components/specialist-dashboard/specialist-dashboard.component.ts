import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { userResponse } from '../../Interfaces/Userinterface';
import { GigService } from '../../Services/gig.services';
import { Order, ordersResponse } from '../../Interfaces/gig.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [RouterLink, FooterComponent, CommonModule],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css',
})
export class SpecialistDashboardComponent {
  user_id!: string;
  Specialists_id!: string;
  user: userResponse = {} as userResponse;
  ordersArr: Order[] = [];

  getUserId() {
    this.route.params.subscribe((params) => {
      this.user_id = params['id'];
    });
    this.getOneUserDetails();
  }

  getId() {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.Specialists_id = params['id'];
      console.log("Found this",this.Specialists_id);
      this.fetchOrders()
    });

    const token: string = localStorage.getItem('token') as string;
    this.authservice.readToken(token).subscribe((res) => {
      console.log(res);

      this.user_id = res.info.user_id;
    });
  }

  constructor(
    private router: Router,
    private userservice: UserService,
    private authservice: AuthService,
    private gigservice: GigService,
    private route: ActivatedRoute
  ) {
    this.getUserId();
    this.getId();
  }

  getOneUserDetails() {
    this.userservice.getSpecialistDetails(this.user_id).subscribe((res) => {
      this.user.Email = res.user[0].Email;
      this.user.Phone_number = res.user[0].Phone_number;
      this.user.Username = res.user[0].Username;
      this.user.Role = res.user[0].Role;
      this.user.Speciality = res.user[0].Speciality;
      this.user.Description = res.user[0].Description;
      this.user.First_Name = res.user[0].First_Name;
      this.user.Last_Name = res.user[0].Last_Name;
      this.user.Phone_number = res.user[0].Phone_number;
      this.user.Profile_Image = res.user[0].Profile_Image;
      this.user.categoryname = res.user[0].categoryname;
      this.user.Rate = res.user[0].Rate;
      const createdDate = new Date(res.user[0].created_at);

      // Define an array to store month names
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Get day, month, and year
      const day = createdDate.getDate();
      const monthIndex = createdDate.getMonth();
      const year = createdDate.getFullYear();

      // Format the date
      const formattedDate = `${day} ${months[monthIndex]} ${year}`;
      this.user.created_at = formattedDate;
    });
  }

  fetchOrders() {
    this.gigservice.specialistGigs(this.Specialists_id).subscribe(
      (res) => {
        console.log(res);
        res.gigs.forEach((gig) =>{
          this.ordersArr.push(gig)
        })
        // if (res.error) {
          // console.error(res.error);
        // } else if (res.gigs.length > 0) {
          // this.ordersArr = res.gigs;
          console.log(this.ordersArr);
        // } else {
          // console.warn('No gigs found for the specialist');
        // }
      },
      // (error) => {
      //   console.error('Error fetching orders:', error);
      // }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
