import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../service-profile/profile.service';
import { UserDto, UserDetails } from '../../auth/models/userDto';
import { UserUpdateRequest } from '../../auth/Users_request/UserUpdateRequest';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  userForm: FormGroup;
  user$: Observable<UserDto | null>; // Ajustez le type pour accepter null
  userId: string; // Vous devez définir comment obtenir l'ID utilisateur actuel

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      country: [''],
      city: [''],
      address: [''],
      postalCode: [''],
      aboutMe: [''],
      profilePicture: [null]
    });

    this.loadUser();
  }

  loadUser(): void {
    this.user$ = this.profileService.getCurrentUser().pipe(
      catchError(error => {
        console.error('Error fetching user data', error);
        return of(null);
      })
    );

    this.user$.subscribe(user => {
      if (user && user.userDetails) { // Assurez-vous que user et user.userDetails ne sont pas null
        this.userId = user.id;
        this.userForm.patchValue(user.userDetails);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userUpdateRequest: UserUpdateRequest = {
      id: this.userId,
      userDetails: this.userForm.value
    };

    this.profileService.updateUserDetails(userUpdateRequest).subscribe(
      response => {
        console.log('User details updated successfully');
      },
      error => {
        console.error('Error updating user details', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileService.updateUserProfilePicture(this.userId, file).subscribe(
        response => {
          console.log('Profile picture updated successfully');
        },
        error => {
          console.error('Error updating profile picture', error);
        }
      );
    }
  }
}

/*import { Component, OnInit } from '@angular/core';
import { IconUserModel } from '../../../_metronic/partials';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  users1: Array<IconUserModel> = [
    { name: 'Emma Smith', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Rudy Stone', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users2 = [
    { name: 'Alan Warden', initials: 'A', color: 'warning' },
    { name: 'Brian Cox', avatar: './assets/media/avatars/300-5.jpg' },
  ];

  users3 = [
    { name: 'Mad Masy', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Cris Willson', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Mike Garcie', initials: 'M', color: 'info' },
  ];

  users4 = [
    { name: 'Nich Warden', initials: 'N', color: 'warning' },
    { name: 'Rob Otto', initials: 'R', color: 'success' },
  ];

  users5 = [
    { name: 'Francis Mitcham', avatar: './assets/media/avatars/300-20.jpg' },
    { name: 'Michelle Swanston', avatar: './assets/media/avatars/300-7.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users6 = [
    { name: 'Emma Smith', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Rudy Stone', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users7 = [
    { name: 'Meloday Macy', avatar: './assets/media/avatars/300-2.jpg' },
    { name: 'Rabbin Watterman', initials: 'S', color: 'success' },
  ];

  users8 = [
    { name: 'Emma Smith', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Rudy Stone', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users9 = [
    { name: 'Meloday Macy', avatar: './assets/media/avatars/300-2.jpg' },
    { name: 'Rabbin Watterman', initials: 'S', color: 'danger' },
  ];

  constructor() {}

  ngOnInit(): void {}
}*/
