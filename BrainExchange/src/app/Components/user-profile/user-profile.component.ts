import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { userResponse } from '../../Interfaces/Userinterface';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  user_id!: string;
  user: userResponse = {} as userResponse;

  getUserId() {
    this.route.params.subscribe((params) => {
      this.user_id = params['id'];
    });
    this.getOneUserDetails();
  }

  constructor(
    private router: Router,
    private userservice: UserService,
    private route: ActivatedRoute
  ) {
    this.getUserId();
  }

  fetchUsers(){
    this.userservice.getOneUserDetails(this.user_id).subscribe((res)=>{
      res.user.forEach((user)=>{
        this.user_id= user.user_id
      })
    })
  }

  navigateToUser(){
    this.router.navigate(['/user-profile', this.user.user_id])
  }

  getOneUserDetails() {
    this.userservice.getOneUserDetails(this.user_id).subscribe((res) => {
      console.log(res.user[0]);
      if (res && res.user && res.user.length > 0) {
        this.user.Email = this.user.Email;
        this.user.Phone_number = this.user.Phone_number;
        this.user.Username = this.user.Username;
        this.user.Role = this.user.Role;
        this.user.Speciality = this.user.Speciality;
        this.user.Description = this.user.Description;
        this.user.First_Name = this.user.First_Name;
        this.user.Last_Name = this.user.Last_Name;
        this.user.created_at = this.user.created_at;
        this.user.Rate = this.user.Rate;
      } else {
        console.error('User data not found');
       
      }
    });
  }
}
