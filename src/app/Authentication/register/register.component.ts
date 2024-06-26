import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private authService: AuthService, 
              private router: Router) {}

  register(): void {
    const registerRequest: RegisterRequest = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.authService.register(registerRequest).subscribe(response => {
      console.log('Registration successful', response);
      this.router.navigate(['/login']);
    }, error => {
      alert('Registration failed');
    });
  }
}
