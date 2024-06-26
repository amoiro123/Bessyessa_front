import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenDto } from '../models/token-dto.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterDto } from '../models/register-dto.model';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<TokenDto>(`${this.apiUrl}/login`, loginRequest)
      .pipe(map(response => {
        localStorage.setItem('token', response.token); // Stocker le token
      }));
  }

  register(registerRequest: RegisterRequest): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${this.apiUrl}/register`, registerRequest);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
