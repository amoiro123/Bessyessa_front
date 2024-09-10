import { Component, OnInit } from '@angular/core';
import { User } from '../auth/models/user';
import { ProfileService } from './service-profile/profile.service';
import { UserDetails } from '../auth/models/userdetails';
import { UserUpdateRequest } from '../auth/Users_request/UserUpdateRequest';
import { Router } from '@angular/router';
import { UserDto } from '../auth/models/userDto';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  users: User[] = [];
  usersdto: UserDto[] = [];
  userDetails: UserDetails[] = [];
  userUpdateRequest: UserUpdateRequest[] = [];
  selectedUser: User | null = null;
  selectedDetailsUser: UserDetails | null = null;
  visible: boolean = false;
  selectedFile?: File;
  currentUser: UserDto;
  profileImageUrl: SafeUrl;
  constructor(private profileservice: ProfileService,private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
   // this.loadUsers();
    this.fetchCurrentUser();
   // this.getUserByUsername("admin12");
   // this.loadUsers();
  }

  loadUsers(): void {
    this.profileservice.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  fetchCurrentUser(): void {
    this.profileservice.getCurrentUser().subscribe(
      (userdto: UserDto) => {
        this.currentUser = userdto;
        console.log('Current User:', this.currentUser);
        if (this.currentUser.userDetails?.profilePicture) {
          this.loadProfileImage(this.currentUser.userDetails.profilePicture);
          console.log('UserImage User:', this.currentUser.userDetails.profilePicture);
        }
      },
      (error) => {
        console.error('Error fetching current user:', error);
        // Gérer les erreurs selon vos besoins
      }
    );
   // console.log(this.selectedDetailsUser?.profilePicture)
  }

  getUserByEmail(email: string): void {
    this.profileservice.getUserByEmail(email).subscribe(user => {
      console.log(user);
    });
  }

  createUser(newUser: User): void {
    this.profileservice.createUser(newUser).subscribe(createdUser => {
      console.log(createdUser);
      this.loadUsers();
    });
  }

  getUserByUsername(username: string): void {
    this.profileservice.getUserByUsername(username).subscribe(user => {
      console.log(user);
      this.selectedUser = user;
    });
  }

 /* updateUserById(userUpdateRequest: UserUpdateRequest): void {
    this.profileservice.updateUser(userUpdateRequest).subscribe(updatedUser => {
      console.log(updatedUser);
      this.loadUsers();
    });
  }*/

  deleteUser(id: string): void {
    this.profileservice.deleteUser(id).subscribe(response => {
      console.log('Delete Successful', response);
      this.loadUsers();
    }, error => {
      alert('Delete failed');
    });
  }

  updateUserDetails() {
    const request: UserUpdateRequest = {
      id: 'user-id',
      // Ajoutez d'autres champs nécessaires
    };
    this.profileservice.updateUserDetails(request).subscribe(
      response => {
        console.log('User details updated successfully', response);
      },
      error => {
        console.error('Error updating user details', error);
      }
    );
  }

  updateUserProfilePicture(fileInput: any) {
    const file: File = fileInput.files[0];
    const userId = 'user-id';
    this.profileservice.updateUserProfilePicture(userId, file).subscribe(
      response => {
        console.log('User profile picture updated successfully', response);
      },
      error => {
        console.error('Error updating user profile picture', error);
      }
    );
  }

  loadProfileImage(profilePicture: string): void {
    this.profileservice.downloadImage(profilePicture).subscribe(
      (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.error('Error downloading profile image:', error);
      }
    );
  }

}


