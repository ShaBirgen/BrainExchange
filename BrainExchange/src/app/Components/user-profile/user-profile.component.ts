import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { userResponse } from '../../Interfaces/Userinterface';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { GigService } from '../../Services/gig.services';
import { Order } from '../../Interfaces/gig.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FooterComponent, RouterLink, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  user_id!: string;
  user: userResponse = {} as userResponse;
  ordersArr: Order[] = [];

  getId() {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.user_id = params['id'];
      console.log(this.user_id);
    });

    const token: string = localStorage.getItem('token') as string;
    this.authservice.readToken(token).subscribe((res) => {
      console.log(res);

      this.user_id = res.info.user_id;
    this.fetchOrders();
    });
  }

  constructor(
    private router: Router,
    private userservice: UserService,
    private authservice: AuthService,
    private gigservice: GigService,
    private route: ActivatedRoute
  ) {
    // this.getUserId();
    this.getId();
    this.getOneUserDetails();
  }

  getOneUserDetails() {
    this.userservice.getOneUserDetails(this.user_id).subscribe((res) => {
      if (res && res.user && res.user.length > 0) {
        this.user.Email = res.user[0].Email;
        this.user.Phone_number = res.user[0].Phone_number;
        this.user.Username = res.user[0].Username;
        this.user.Role = res.user[0].Role;
        this.user.Speciality = res.user[0].Speciality;
        this.user.Description = res.user[0].Description;
        this.user.First_Name = res.user[0].First_Name;
        this.user.Last_Name = res.user[0].Last_Name;
        this.user.Profile_Image = res.user[0].Profile_Image;

        //POPULATING DATE AS 31 MARCH 2024
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
        this.user.Rate = res.user[0].Rate;
        console.log(this.user);
      } else {
        console.error('User data not found');
      }
    });
  }

  fetchOrders() {
    this.gigservice.getByUser(this.user_id).subscribe((res) => {
      console.log(res);
      res.gigs.forEach((gig) => {
        this.ordersArr.push(gig);
      });
      console.log(this.ordersArr);
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
