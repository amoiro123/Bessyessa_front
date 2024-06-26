import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Users_services/user.service';
import { UserUpdateRequest } from '../Users_request/userUpdateRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userUpdateRequest: UserUpdateRequest= {
    id: '',
    username: '',
    password: '',
    userDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
      postalCode: '',
      aboutMe: '',
      profilePicture: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router : Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(this.userUpdateRequest.id).subscribe(user => {
      this.userUpdateRequest = {
        id: user.id,
        username: user.username,
        userDetails: user.userDetails
      };
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.userUpdateRequest).subscribe(updatedUser => {
      console.log('User updated:', updatedUser);
      this.router.navigate(['/edit-user']);
      // Redirect or give feedback
    });
  }

}
