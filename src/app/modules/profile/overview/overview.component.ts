import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../service-profile/profile.service';
import { UserDto, UserDetails } from '../../auth/models/userDto';
import { UserUpdateRequest } from '../../auth/Users_request/UserUpdateRequest';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
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