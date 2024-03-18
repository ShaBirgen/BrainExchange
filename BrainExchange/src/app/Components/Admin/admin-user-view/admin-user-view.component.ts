import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../Services/user.service';
import { CommonModule } from '@angular/common';
import { userResponse } from '../../../../Interfaces/Userinterface';

@Component({
  selector: 'app-admin-user-view',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-user-view.component.html',
  styleUrl: './admin-user-view.component.css',
})
export class AdminUserViewComponent {
  usersArr: userResponse[] = [];

  constructor(private userService: UserService) {
    this.fetchUsers();
  }
  fetchUsers() {
    this.userService.getUsers().subscribe((res) => {
      console.log(res);
      
      if (res.error) {
        console.log(res.error);
      } else if (res.users) {
        console.log(res.users);
        res.users.forEach((user)=>{this.usersArr.push(user)})
        // this.usersArr = res.users;
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log(res);

      this.fetchUsers();
      this.isPopupOpen = false;
    });
  }

  isPopupOpen: boolean = false;

  openPopup() {
    this.isPopupOpen = true;
  }
}
