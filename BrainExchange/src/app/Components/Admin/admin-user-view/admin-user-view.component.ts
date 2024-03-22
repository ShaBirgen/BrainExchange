import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { CommonModule } from '@angular/common';
import { User, userResponse, usersResponse } from '../../../Interfaces/Userinterface';
import Swal from 'sweetalert2';
import { dropdown } from '../../../Interfaces/dropdown.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-view',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-user-view.component.html',
  styleUrl: './admin-user-view.component.css',
})
export class AdminUserViewComponent {
  usersArr: User[] = [];
  users: dropdown[] = [
    { id: 'user', name: 'User' },
    { id: 'specialist', name: 'Specialist' },
  ];
  allUsers: string = 'all';

  get filteredUsers(): User[] {
    if (this.allUsers === 'all') {
      return this.usersArr;
    } else {
      return this.usersArr.filter((user) => user.Role === this.allUsers);
    }
  }

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
        res.users.forEach((user) => {
          this.usersArr.push(user);
        });
        // this.usersArr = res.users;
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log(res);

      this.usersArr = [];

      this.fetchUsers();
    });
  }

  remove(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(id); // Call the deleteUser method if the user confirms
        Swal.fire({
          title: 'Deleted!',
          text: 'Your user has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
