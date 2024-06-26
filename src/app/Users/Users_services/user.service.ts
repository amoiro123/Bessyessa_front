import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users_models/user';
import { UserUpdateRequest } from '../Users_request/userUpdateRequest';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserDto } from '../users_models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = "http://localhost:8080/v1/user"; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/getAll");
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`);
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }

  updateUser(userUpdateRequest: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl+"/update"}/${userUpdateRequest.id}`, userUpdateRequest);
  }

  deleteUser(id: string)  {
    return this.http.delete(`${this.apiUrl+"/deleteUserById"}/${id}`);
  }

  updateUserById(request: UserUpdateRequest, file?: File): Observable<UserDto> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.put<User>(`${this.apiUrl}/update`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

}
