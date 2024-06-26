/*import { Component, OnInit } from '@angular/core';
import { UserService } from '../Users_services/user.service';
import { User } from '../users_models/user';
import { UserUpdateRequest } from '../Users_request/userUpdateRequest';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  users: User[]= [];
  userUpdateRequest: UserUpdateRequest[]= [];
  selectedUser: User | null = null;
  items: MenuItem[] | undefined;
  visible: boolean = false;


  constructor(private userService: UserService, 
              private router : Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserByEmail(email: string): void {
    this.userService.getUserByEmail(email).subscribe(user => {
      console.log(user);
    });
  }

  createUser(newUser: User): void {
    this.userService.createUser(newUser).subscribe(createdUser => {
      console.log(createdUser);
      this.loadUsers(); 
    });
  }

  getUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe(user => {
      console.log(user);
      this.selectedUser = user;
      });
    }

    updateUser1(userUpdateRequest: UserUpdateRequest): void {
      this.userService.updateUser(userUpdateRequest).subscribe(updatedUser => {
        console.log(updatedUser);
        this.loadUsers(); 
      });
    }
  
    deleteUser(id: string): void {
      this.userService.deleteUser(id).subscribe(response => {
        console.log('Delete Successful',response);
        this.loadUsers(); 
      }, error => {
        alert('Delete failed');
      });
    }  
 
    navigateToEditUser(userId: string): void {
      this.router.navigate(['/edit-user', userId]);
  }

  showDialog(user: User) {
    this.selectedUser = { ...user };
    this.visible = true;
}

updateUser(): void {
  if (this.selectedUser) {
    const updateRequest: UserUpdateRequest = {
      id: this.selectedUser.id,
      username: this.selectedUser.username,
      userDetails: this.selectedUser.userDetails,
    };

    this.userService.updateUserById(updateRequest).subscribe(() => {
      this.visible = false;
      this.loadUsers();
    });
  }
}

}*/

import { Component, OnInit } from '@angular/core';
import { UserService } from '../Users_services/user.service';
import { User } from '../users_models/user';
import { UserUpdateRequest } from '../Users_request/userUpdateRequest';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserDetails } from '../users_models/userdetails';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  userDetails: UserDetails[] = [];
  userUpdateRequest: UserUpdateRequest[] = [];
  selectedUser: User | null = null;
  selectedDetailsUser: UserDetails | null = null;
  items: MenuItem[] | undefined;
  visible: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserByEmail(email: string): void {
    this.userService.getUserByEmail(email).subscribe(user => {
      console.log(user);
    });
  }

  createUser(newUser: User): void {
    this.userService.createUser(newUser).subscribe(createdUser => {
      console.log(createdUser);
      this.loadUsers();
    });
  }

  getUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe(user => {
      console.log(user);
      this.selectedUser = user;
    });
  }

  updateUserById(userUpdateRequest: UserUpdateRequest): void {
    this.userService.updateUser(userUpdateRequest).subscribe(updatedUser => {
      console.log(updatedUser);
      this.loadUsers();
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(response => {
      console.log('Delete Successful', response);
      this.loadUsers();
    }, error => {
      alert('Delete failed');
    });
  }

  navigateToEditUser(userId: string): void {
    this.router.navigate(['/edit-user', userId]);
  }

  showDialog(user: User): void {
    this.selectedUser = { ...user };
    this.selectedDetailsUser = this.selectedUser.userDetails || { firstName: '', lastName: '', phoneNumber: '', country: '', city: '', address: '', postalCode: '', aboutMe: '', profilePicture: '' };
    this.visible = true;
  }

  updateUser(): void {
    if (this.selectedUser) {
      const updateRequest: UserUpdateRequest = {
        id: this.selectedUser.id,
        username: this.selectedUser.username,
        userDetails: this.selectedUser.userDetails,
      };

      console.log('Updating user with request:', updateRequest);

      this.userService.updateUserById(updateRequest).subscribe(() => {
        this.visible = false;
        this.loadUsers();
      },
      (error) => {
        console.error('Update failed12:', error); // Log l'erreur pour plus de détails
      }
    );
    }
  }

}
