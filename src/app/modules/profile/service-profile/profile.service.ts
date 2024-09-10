import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/models/user';
import { UserUpdateRequest } from '../../auth/Users_request/UserUpdateRequest';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserDto } from '../../auth/models/userDto';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private apiUrl = "http://localhost:8080/v1/user"; 
    private apiUrl1 = "http://localhost:8080/v1/file-storage";

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
    return this.http.get<User>(`${this.apiUrl}/getUserByUsername/${username}`);
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }

  //updateUser(userUpdateRequest: UserUpdateRequest): Observable<User> {
    //return this.http.put<User>(`${this.apiUrl+"/update"}/${userUpdateRequest.id}`, userUpdateRequest);
  //}

  deleteUser(id: string)  {
    return this.http.delete(`${this.apiUrl+"/deleteUserById"}/${id}`);
  }

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/currentUser`);
  }

  updateUserDetails(request: UserUpdateRequest): Observable<any> {
    const url = `${this.apiUrl}/update/details`;
    return this.http.put(url, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUserProfilePicture(id: string, file: File): Observable<any> {
    const url = `${this.apiUrl}/update/profile-picture`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put(url, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  downloadImage(profilePicture: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl1}/download/${profilePicture}`, { responseType: 'blob' });
  }

}