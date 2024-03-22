import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { userResponse } from '../../Interfaces/Userinterface';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css',
})
export class SpecialistDashboardComponent {
  user_id!: string;
  user: userResponse = {} as userResponse;

  getUserId(){
    this.route.params.subscribe(params => {
      this.user_id = params['id']
    })
    this.getOneUserDetails();
  }

  constructor(
    private router: Router,
    private userservice: UserService,
    private route: ActivatedRoute
    ) {
    this.getUserId()
  }

  getOneUserDetails() {
    this.userservice.getOneUserDetails(this.user_id).subscribe((res) => {
      console.log(res);
      this.user.Email = res.user[0].Email;
      this.user.Phone_number = res.user[0].Phone_number;
      this.user.Username = res.user[0].Username;
      this.user.Role = res.user[0].Role;
      this.user.Speciality= res.user[0].Speciality;
      this.user.Description = res.user[0].Description;
      this.user.First_Name = res.user[0].First_Name;
      this.user.Last_Name = res.user[0].Last_Name;
      this.user.created_at = res.user[0].created_at;
      this.user.Phone_number = res.user[0].Phone_number;
      this.user.Rate= res.user[0].Rate;
      
    });
  }

  
}
